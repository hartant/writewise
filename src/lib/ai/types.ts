/**
 * Provider-neutral contract for optional AI / paid text services.
 *
 * Nothing in the current site calls an AI provider. These types exist so that a
 * future feature (e.g. "rewrite for clarity" or "summarize") can be added by
 * writing one adapter in ./providers and one server route, without touching the
 * existing local tools. See docs/EXTENDING.md.
 */

export type AICapability = "rewrite" | "summarize" | "grammar" | "outline" | "custom";

export type AIRequest = {
  capability: AICapability;
  /** The user's text. Only send it after the user has explicitly asked for an AI action. */
  input: string;
  /** Optional instruction, e.g. "make it more formal". */
  instruction?: string;
  maxOutputTokens?: number;
};

export type AIResponse =
  | { ok: true; output: string; provider: string; model?: string }
  | { ok: false; error: "disabled" | "unsupported" | "rate_limited" | "provider_error"; message: string };

export interface AIProvider {
  /** Stable identifier used in AI_PROVIDER, e.g. "anthropic" or "openai". */
  readonly id: string;
  readonly capabilities: readonly AICapability[];
  /** Called on the server only. Implementations must never run in the browser. */
  generate(request: AIRequest): Promise<AIResponse>;
}
