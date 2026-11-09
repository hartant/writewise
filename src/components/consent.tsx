"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const KEY = "ww-analytics-consent";
const OPEN_EVENT = "ww:open-consent";
type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Loads Google Analytics 4 only after the visitor opts in. Nothing is loaded and no
 * cookies are set until "Allow analytics" is clicked. Rendered only when
 * NEXT_PUBLIC_GA_ID is configured.
 */
export function ConsentManager({ gaId }: { gaId: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved);
    if (!saved) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(value: Choice) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    if (value === "denied" && choice === "granted") {
      // Revoking: update consent, then reload so the GA script is no longer present.
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("consent", "update", { analytics_storage: "denied" });
      window.location.reload();
      return;
    }
    setChoice(value);
    setOpen(false);
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-desc"
          className="card fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl p-5 sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p id="consent-title" className="font-semibold text-ink">
                Help us improve WriteWise?
              </p>
              <p id="consent-desc" className="mt-1 text-sm leading-6 text-muted">
                With your permission we use Google Analytics cookies to count visits and see which tools are useful. Text
                you type into the tools is never part of this. See our{" "}
                <a href="/privacy" className="text-ink underline decoration-accent underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary" onClick={() => decide("granted")}>
                  Allow analytics
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => decide("denied")}>
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="text-left text-sm text-muted transition-colors hover:text-ink"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
