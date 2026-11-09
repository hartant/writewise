import { CloudCog, LockKeyhole } from "lucide-react";
import Link from "next/link";
import type { ProcessingMode } from "@/lib/tools";

export function PrivacyBadge({ mode }: { mode: ProcessingMode }) {
  if (mode === "server") {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-warn">
        <CloudCog className="h-4 w-4" aria-hidden="true" />
        This tool sends your text to a server for processing.{" "}
        <Link href="/privacy" className="underline">
          How it&apos;s handled
        </Link>
      </p>
    );
  }
  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted">
      <LockKeyhole className="h-4 w-4 text-ok" aria-hidden="true" />
      Runs in your browser. Nothing you type is uploaded.
    </p>
  );
}
