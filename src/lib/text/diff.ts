/**
 * Word- and line-level text diff based on Myers' O(ND) algorithm, with common
 * prefix/suffix trimming. Runs entirely in the browser.
 */

export type DiffMode = "words" | "lines";
export type DiffSegment = { type: "equal" | "insert" | "delete"; value: string };

export type DiffResult = {
  segments: DiffSegment[];
  mode: DiffMode;
  /** True when a word diff was too large and the comparison fell back to lines. */
  fellBack: boolean;
  stats: {
    wordsAdded: number;
    wordsRemoved: number;
    wordsUnchanged: number;
    additions: number;
    deletions: number;
    /** 0–100, based on unchanged words relative to both texts. */
    similarity: number;
    identical: boolean;
  };
};

const WORD_TOKEN = /\s+|[\p{L}\p{N}_]+(?:['’][\p{L}\p{N}_]+)*|[^\s\p{L}\p{N}_]/gu;

function tokenize(text: string, mode: DiffMode): string[] {
  if (!text) return [];
  if (mode === "lines") return text.match(/[^\n]*\n|[^\n]+/g) ?? [];
  return text.match(WORD_TOKEN) ?? [];
}

/** Whitespace differences inside a line are not treated as changes. */
function tokenKey(token: string, mode: DiffMode): string {
  if (mode === "lines") return token.replace(/\s+$/, "").replace(/\s+/g, " ");
  if (/^\s+$/.test(token)) return token.includes("\n") ? "\n" : " ";
  return token;
}

type Op = 0 | 1 | 2; // equal, insert, delete

/** Returns an edit script, or null when the edit distance exceeds maxD. */
function myers(a: Int32Array, b: Int32Array, maxD: number): Op[] | null {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  if (max === 0) return [];
  const offset = max + 1;
  const v = new Int32Array(2 * max + 3);
  const trace: { base: number; data: Int32Array }[] = [];
  const limit = Math.min(max, maxD);

  for (let d = 0; d <= limit; d++) {
    const lo = Math.max(0, offset - d - 1);
    trace.push({ base: lo - offset, data: v.slice(lo, offset + d + 2) });
    for (let k = -d; k <= d; k += 2) {
      let x: number;
      if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) x = v[offset + k + 1];
      else x = v[offset + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }
      v[offset + k] = x;
      if (x >= n && y >= m) return backtrack(trace, n, m);
    }
  }
  return null;
}

function backtrack(trace: { base: number; data: Int32Array }[], n: number, m: number): Op[] {
  const ops: Op[] = [];
  let x = n;
  let y = m;
  for (let d = trace.length - 1; d >= 0; d--) {
    const { base, data } = trace[d];
    const get = (k: number) => data[k - base];
    const k = x - y;
    const prevK = k === -d || (k !== d && get(k - 1) < get(k + 1)) ? k + 1 : k - 1;
    const prevX = get(prevK);
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) {
      ops.push(0);
      x--;
      y--;
    }
    if (d > 0) {
      if (x === prevX) {
        ops.push(1);
        y--;
      } else {
        ops.push(2);
        x--;
      }
    }
    x = prevX;
    y = prevY;
  }
  return ops.reverse();
}

// Caps memory use (the trace grows roughly with D²).
const MAX_EDIT_DISTANCE = 3000;

function diffTokens(aTok: string[], bTok: string[], mode: DiffMode): DiffSegment[] | null {
  const ids = new Map<string, number>();
  const toIds = (tokens: string[]) => {
    const out = new Int32Array(tokens.length);
    tokens.forEach((t, i) => {
      const key = tokenKey(t, mode);
      let id = ids.get(key);
      if (id === undefined) {
        id = ids.size;
        ids.set(key, id);
      }
      out[i] = id;
    });
    return out;
  };
  const a = toIds(aTok);
  const b = toIds(bTok);

  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }

  const ops = myers(a.subarray(start, endA), b.subarray(start, endB), MAX_EDIT_DISTANCE);
  if (!ops) return null;

  const segments: DiffSegment[] = [];
  const push = (type: DiffSegment["type"], value: string) => {
    const last = segments[segments.length - 1];
    if (last && last.type === type) last.value += value;
    else segments.push({ type, value });
  };

  for (let i = 0; i < start; i++) push("equal", bTok[i]);
  let ia = start;
  let ib = start;
  for (const op of ops) {
    if (op === 0) {
      push("equal", bTok[ib]);
      ia++;
      ib++;
    } else if (op === 1) push("insert", bTok[ib++]);
    else push("delete", aTok[ia++]);
  }
  for (let i = endB; i < bTok.length; i++) push("equal", bTok[i]);
  return groupChanges(segments);
}

/**
 * Merges change runs separated only by whitespace, so "many" → "dozens of" reads as
 * one replacement instead of several fragments. Each run is emitted as one deletion
 * followed by one insertion.
 */
function groupChanges(segments: DiffSegment[]): DiffSegment[] {
  const out: DiffSegment[] = [];
  let del = "";
  let ins = "";
  const flush = () => {
    // A side that only holds folded whitespace is already represented on the other side.
    if (del && (del.trim() || !ins.trim())) out.push({ type: "delete", value: del });
    if (ins && (ins.trim() || !del.trim())) out.push({ type: "insert", value: ins });
    del = ins = "";
  };
  segments.forEach((s, i) => {
    if (s.type === "delete") del += s.value;
    else if (s.type === "insert") ins += s.value;
    else if ((del || ins) && /^\s+$/.test(s.value) && segments[i + 1] && segments[i + 1].type !== "equal") {
      del += s.value;
      ins += s.value;
    } else {
      flush();
      out.push(s);
    }
  });
  flush();
  return out;
}

function countWordsIn(text: string): number {
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function diffTexts(original: string, revised: string, mode: DiffMode = "words"): DiffResult {
  let usedMode = mode;
  let fellBack = false;
  let segments = diffTokens(tokenize(original, mode), tokenize(revised, mode), mode);

  if (!segments && mode === "words") {
    usedMode = "lines";
    fellBack = true;
    segments = diffTokens(tokenize(original, "lines"), tokenize(revised, "lines"), "lines");
  }
  if (!segments) {
    fellBack = true;
    segments = [
      ...(original ? [{ type: "delete" as const, value: original }] : []),
      ...(revised ? [{ type: "insert" as const, value: revised }] : []),
    ];
  }

  let wordsAdded = 0;
  let wordsRemoved = 0;
  let wordsUnchanged = 0;
  let additions = 0;
  let deletions = 0;
  for (const s of segments) {
    const words = countWordsIn(s.value);
    if (s.type === "equal") wordsUnchanged += words;
    else if (s.type === "insert") {
      wordsAdded += words;
      if (s.value.trim()) additions++;
    } else {
      wordsRemoved += words;
      if (s.value.trim()) deletions++;
    }
  }

  const totalWords = countWordsIn(original) + countWordsIn(revised);
  const similarity = totalWords === 0 ? 100 : Math.round(((2 * wordsUnchanged) / totalWords) * 1000) / 10;

  return {
    segments,
    mode: usedMode,
    fellBack,
    stats: {
      wordsAdded,
      wordsRemoved,
      wordsUnchanged,
      additions,
      deletions,
      similarity: Math.min(100, similarity),
      identical: additions === 0 && deletions === 0,
    },
  };
}
