import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CodeLearners" },
      {
        name: "description",
        content:
          "Privacy policy for CodeLearners — what data we collect, how we use cookies, and how third-party advertising (Google AdSense) works on our site.",
      },
      { property: "og:title", content: "Privacy Policy — CodeLearners" },
      {
        property: "og:description",
        content: "How CodeLearners handles your data, cookies, and advertising.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "July 21, 2026";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: {updated}</p>
      <AdSlot className="mt-6" />

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Who we are</h2>
          <p className="mt-2">
            CodeLearners ("we", "us", "our") is a free educational website that
            helps people learn programming through interactive, in-browser lessons.
            By using this site you agree to this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information we collect</h2>
          <p className="mt-2">We try to collect as little as possible:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Local lesson data:</strong> lessons you complete are
              stored in your browser's <code>localStorage</code>. This data
              never leaves your device.
            </li>
            <li>
              <strong>Code you run in the editors:</strong> Python and SQL
              code you write executes entirely in your browser via Pyodide
              and sql.js. We do not send it to any server.
            </li>
            <li>
              <strong>Anonymous analytics:</strong> we may collect aggregated
              usage data (page views, device type, country) to improve the site.
            </li>
            <li>
              <strong>Contact form:</strong> if you email us, we keep your
              email and message only to reply to you.
            </li>
            <li>
              <strong>Account data (optional):</strong> if you sign in to
              connect an AI agent via our MCP integration, we store your
              email address and authentication tokens with our auth provider.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Cookies</h2>
          <p className="mt-2">
            We use cookies and similar technologies to remember your preferences,
            keep you signed in, and to enable third-party advertising. You can
            disable cookies in your browser at any time — some site features
            (like sign-in) will not work without them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Advertising (Google AdSense)
          </h2>
          <p className="mt-2">
            This site is supported by advertising. We use{" "}
            <strong>Google AdSense</strong>, a third-party advertising service.
            Google and its partners may use cookies and device identifiers to
            serve ads based on your prior visits to this and other websites.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Google's use of advertising cookies enables it and its partners
              to serve ads based on your visit to our site and/or other sites
              on the Internet.
            </li>
            <li>
              You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              You can also opt out of a third-party vendor's use of cookies for
              personalised advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Children's privacy</h2>
          <p className="mt-2">
            Our content is intended for learners aged 13 and above. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Your rights</h2>
          <p className="mt-2">
            You can clear your local lesson data at any time by clearing your
            browser storage for this site. To request deletion of any email
            correspondence or account data, write to us via the{" "}
            <Link to="/contact" className="text-neon hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Changes to this policy</h2>
          <p className="mt-2">
            We may update this policy from time to time. The "Last updated"
            date at the top of this page will reflect the most recent changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p className="mt-2">
            Questions about this policy? Reach us through our{" "}
            <Link to="/contact" className="text-neon hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
