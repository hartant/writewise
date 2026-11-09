/**
 * Plan / entitlement layer. Everything is free today. When paid features are
 * introduced, resolve the visitor's plan here (e.g. from a session or license
 * check) and gate features with `canUse` rather than scattering checks in UI code.
 */
export type PlanTier = "free" | "pro";

export const plans: Record<PlanTier, { name: string; description: string }> = {
  free: { name: "Free", description: "All core tools, no account required." },
  pro: { name: "Pro", description: "Reserved for future premium features. Not available yet." },
};

const rank: Record<PlanTier, number> = { free: 0, pro: 1 };

export function canUse(required: PlanTier, current: PlanTier = "free"): boolean {
  return rank[current] >= rank[required];
}
