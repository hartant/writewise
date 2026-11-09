# Extending WriteWise with AI or paid APIs

Today every tool is local: text never leaves the browser. The codebase is prepared so you can add server-backed
features (AI rewriting, grammar checking, summarization, a paid third-party API) **without** weakening that promise
for the existing tools.

## The extension points

| Where | What it does |
| --- | --- |
| `src/lib/tools.ts` → `processing: "local" \| "server"` | Each tool declares where it processes text. `ToolPage` shows the green "Processed in your browser" badge only for `local`; a `server` tool automatically shows a clear notice instead. |
| `src/lib/tools.ts` → `tier: "free" \| "pro"` | Plan required for a tool. Combine with `canUse()` from `src/lib/plans.ts`. |
| `src/lib/ai/types.ts` | Provider-neutral contract: `AIProvider`, `AIRequest`, `AIResponse`, `AICapability`. |
| `src/lib/ai/index.ts` | Registry plus `getAIProvider()` / `isAIEnabled()`, selected by the `AI_PROVIDER` env var. Defaults to a disabled provider. |
| `src/lib/plans.ts` | Single place to resolve a visitor's plan and gate features. |

## Adding an AI-powered tool, step by step

### 1. Write a provider adapter (server-only)

Create `src/lib/ai/providers/<id>.ts` implementing `AIProvider`. Read the API key from a **server-side** variable
(for example `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`), never from a `NEXT_PUBLIC_*` variable. Use the provider's
official SDK or `fetch`. Add `import "server-only";` at the top (`npm install server-only`) so it can never be
bundled into client code.

```ts
import "server-only";
import type { AIProvider } from "../types";

export const exampleProvider: AIProvider = {
  id: "example",
  capabilities: ["rewrite", "summarize"],
  async generate(req) {
    const key = process.env.EXAMPLE_API_KEY;
    if (!key) return { ok: false, error: "disabled", message: "Missing API key." };
    // Call the provider here, with a timeout and an output-length limit.
    // Return { ok: true, output, provider: "example", model }.
    return { ok: false, error: "unsupported", message: "Not implemented." };
  },
};
```

Register it in `src/lib/ai/index.ts`:

```ts
import { exampleProvider } from "./providers/example";
const registry = { disabled: () => disabledProvider, example: () => exampleProvider };
```

### 2. Add a server route

Create `src/app/api/ai/route.ts` with a `POST` handler that validates input length and capability, applies rate
limiting (for example with an edge KV store or your host's firewall rules), calls `getAIProvider().generate()`, and
returns JSON. Don't log request bodies.

> Route handlers that accept POST requests need a server runtime. They work on Vercel, but **not** with
> `npm run build:static`. For Cloudflare, deploy with the OpenNext Cloudflare adapter or move the endpoint to a
> Cloudflare Worker.

### 3. Build the tool

Add the tool to `src/lib/tools.ts` with `processing: "server"`, then create its client UI and content as for any
tool (see the README). In the UI:

- Only send text **after an explicit action** (a "Rewrite" button), never on every keystroke.
- Hide the feature entirely when AI is disabled: pass `isAIEnabled()` from the server page as a prop.
- Show the result as a suggestion the user can accept, not an automatic replacement.

### 4. Update trust and legal pages before launch

- **Privacy Policy:** name the provider, what is sent, retention, whether the provider trains on submitted data, and
  where processing happens (international transfers matter for UK/EEA visitors).
- **Terms:** acceptable use and limitations of AI output.
- **About / homepage copy:** keep "your text stays on your device" accurate by scoping it to local tools.
- Keep all existing local tools local.

### 5. Paid plans (later)

When a paid tier exists, resolve the visitor's plan on the server (session, license key or payment-provider
customer portal) and gate with `canUse(tool.tier, plan)`. Keep the core local tools free; that's the product's
promise and the reason people trust it.
