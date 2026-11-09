/**
 * Reserved advertising position. Renders nothing today.
 *
 * Placements are chosen so ads never sit inside or between a tool's input and
 * its results: below the tool, inside long-form content, and at the end of
 * articles. To enable ads later, follow docs/ADSENSE-READINESS.md: an approved
 * AdSense account, a Google-certified consent platform for UK/EEA visitors, and a
 * fixed min-height on this container to avoid layout shift (CLS).
 */
export type AdPlacement = "below-tool" | "in-content" | "article-end";

export function AdSlot({ placement }: { placement: AdPlacement }) {
  void placement;
  return null;
}
