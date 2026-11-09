import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { StaticPage } from "@/components/static-page";
import { ContactEmail } from "@/components/contact-email";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How WriteWise handles your data: text in our tools is processed in your browser, we collect minimal technical data, and we never sell personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const analytics = Boolean(site.gaId);
  return (
    <StaticPage
      title="Privacy Policy"
      path="/privacy"
      updated={site.legalUpdated}
      intro="WriteWise is designed to collect as little information as possible. This policy explains what we do and don't collect, and why."
    >
      <h2>Summary</h2>
      <ul>
        <li>Text you enter into our tools is processed in your browser and is not sent to our servers.</li>
        <li>You don&apos;t need an account, and we don&apos;t ask for your name or email to use the tools.</li>
        <li>
          {analytics
            ? "We use Google Analytics only if you agree to it. Until then, no analytics cookies are set."
            : "We don't currently use analytics, advertising or tracking cookies."}
        </li>
        <li>We don&apos;t sell or share personal information.</li>
      </ul>

      <h2>Text you enter into our tools</h2>
      <p>
        All WriteWise tools (including the Word Counter, Character Counter, Case Converter and Text Compare) run as JavaScript in your
        browser. The text you type or paste is processed on your own device and is not transmitted to WriteWise servers. When you
        close or reload the page, the text is discarded, unless you choose to save a draft as described below.
      </p>
      <p>
        If we ever introduce a feature that needs to send text to a server (for example, an optional AI-powered feature), that tool
        will be clearly labeled before you use it, and we will update this policy to explain how that data is handled.
      </p>

      <h2>Information stored in your browser</h2>
      <p>
        We use your browser&apos;s local storage, which stays on your device and is not sent to us, for the following:
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Purpose</th>
            <th>When it&apos;s set</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>theme</code>
            </td>
            <td>Remembers whether you chose light or dark mode</td>
            <td>Only when you use the theme toggle</td>
          </tr>
          <tr>
            <td>
              <code>ww-goal-draft</code>, <code>ww-goal-settings</code>
            </td>
            <td>Keeps your Essay Word Goal Tracker draft and settings between visits</td>
            <td>Only if you turn on “Keep draft in this browser”; deleted when you turn it off</td>
          </tr>
          {analytics && (
            <tr>
              <td>
                <code>ww-analytics-consent</code>
              </td>
              <td>Remembers whether you accepted or declined analytics</td>
              <td>When you make a choice in the cookie banner</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>You can clear these at any time through your browser&apos;s settings for site data.</p>

      <h2>Technical information collected by our hosting provider</h2>
      <p>
        Like almost every website, WriteWise is served by a hosting provider whose servers automatically record basic technical
        information when you request a page: your IP address, browser type, the page requested, the referring page and the date
        and time. This information is used to deliver the site, keep it secure and diagnose problems, and is retained by the
        provider according to its own policies. It does not include the text you enter into our tools.
      </p>
      <p>
        Our fonts and scripts are served from our own domain, so loading a page doesn&apos;t send requests to third-party font or
        script services{analytics ? " unless you accept analytics" : ""}.
      </p>

      <h2>Analytics and cookies</h2>
      {analytics ? (
        <>
          <p>
            We use <strong>Google Analytics 4</strong> to understand how many people visit WriteWise and which tools and guides are
            useful. Google Analytics is loaded <strong>only after you click “Allow analytics”</strong> in our cookie banner. If you
            decline, it is never loaded.
          </p>
          <p>
            When enabled, Google Analytics sets first-party cookies (such as <code>_ga</code>) and collects information such as pages
            viewed, approximate location derived from your IP address, device and browser type, and how you arrived at the site.
            Google Analytics 4 does not log or store full IP addresses. We do not send the text you enter into tools to Google
            Analytics, and we have not enabled advertising features. Google&apos;s use of this data is described in{" "}
            <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
              How Google uses information from sites that use its services
            </a>
            .
          </p>
          <p>
            You can change your choice at any time using the <strong>Cookie settings</strong> link in the footer.
          </p>
        </>
      ) : (
        <p>
          WriteWise does not currently use analytics, advertising or other tracking cookies. If this changes, we will update this
          policy before doing so and, where the law requires it (for example, for visitors in the UK and European Economic Area),
          ask for your consent before setting non-essential cookies.
        </p>
      )}

      <h2>Advertising</h2>
      <p>
        WriteWise does not currently display advertising. If we introduce ads in the future, we will update this policy, explain
        which providers are involved and what data they use, and obtain consent where required before any advertising cookies are
        set.
      </p>

      <h2>If you contact us</h2>
      <p>
        If you email us, we receive your email address and whatever you include in your message. We use this only to respond and to
        improve WriteWise, and we delete correspondence when it&apos;s no longer needed. We don&apos;t add you to marketing lists.
      </p>

      <h2>Children</h2>
      <p>
        WriteWise is a general-audience website used by students of many ages. The tools don&apos;t require any personal information,
        and we don&apos;t knowingly collect personal information from children under 13 (or the minimum age that applies in your
        country). If you believe a child has sent us personal information by email, contact us and we will delete it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights over your personal information, including under the UK GDPR, the EU GDPR,
        Canada&apos;s PIPEDA and US state privacy laws such as the California Consumer Privacy Act. These can include the right to
        access, correct or delete personal information, to object to or restrict processing, and to withdraw consent. Because we
        hold very little personal information (usually only emails you&apos;ve sent us), most requests are simple. Contact us at{" "}
        <ContactEmail /> and we will respond within the time required by applicable law. You also have the right to complain to
        your local data protection authority, such as the Information Commissioner&apos;s Office (ICO) in the UK.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this page if our practices change, and revise the &quot;Last updated&quot; date above. Significant changes,
        such as adding analytics or advertising, will be reflected here before they take effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email <ContactEmail /> or visit our <Link href="/contact">Contact page</Link>.
      </p>
    </StaticPage>
  );
}
