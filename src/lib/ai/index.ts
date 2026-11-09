import type { AIProvider } from "./types";
import { disabledProvider } from "./providers/disabled";

export type { AIProvider, AIRequest, AIResponse, AICapability } from "./types";

/**
 * Register adapters here. Each adapter lives in ./providers/<id>.ts and reads its
 * own secret (e.g. ANTHROPIC_API_KEY) from server-side environment variables.
 * Never prefix API keys with NEXT_PUBLIC_.
 */
const registry: Record<string, () => AIProvider> = {
  disabled: () => disabledProvider,
};

/** Server-only. Selects the provider named by AI_PROVIDER, defaulting to disabled. */
export function getAIProvider(): AIProvider {
  const id = process.env.AI_PROVIDER ?? "disabled";
  return (registry[id] ?? registry.disabled)();
}

/** True when an AI provider is configured. Use it to hide AI UI entirely when false. */
export function isAIEnabled(): boolean {
  const id = process.env.AI_PROVIDER;
  return Boolean(id && id !== "disabled" && registry[id]);
}
