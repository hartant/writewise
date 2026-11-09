import type { AIProvider } from "../types";

/** Default provider: AI features are off and no text leaves the browser. */
export const disabledProvider: AIProvider = {
  id: "disabled",
  capabilities: [],
  async generate() {
    return { ok: false, error: "disabled", message: "AI features are not enabled on this site." };
  },
};
