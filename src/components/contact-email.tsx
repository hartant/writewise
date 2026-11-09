import { site } from "@/lib/site";

/** The site's contact address, or a clear notice if the owner hasn't configured one yet. */
export function ContactEmail() {
  if (!site.contactConfigured) {
    return <span>(contact email not yet configured: set NEXT_PUBLIC_CONTACT_EMAIL)</span>;
  }
  return <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;
}
