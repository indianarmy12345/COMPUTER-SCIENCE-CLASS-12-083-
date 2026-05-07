import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Bug, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CS 083 Hub" },
      {
        name: "description",
        content:
          "Get in touch with CS 083 Hub. Send feedback, report a bug, or suggest a topic for our CBSE Class 12 Computer Science learning platform.",
      },
      { property: "og:title", content: "Contact — CS 083 Hub" },
      {
        property: "og:description",
        content: "Send feedback, report a bug, or suggest a topic for CS 083 Hub.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT_EMAIL = "cslearners11@gmail.com";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`CS 083 Hub — message from ${name || "a learner"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
        <Sparkles className="h-3 w-3" /> We'd love to hear from you
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Contact us</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Found a bug, spotted a typo, or want a chapter explained better?
        Drop us a note and we'll get back to you.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <Mail className="h-5 w-5 text-neon" />
          <h3 className="mt-2 text-sm font-semibold">Email</h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 block text-xs text-muted-foreground hover:text-neon"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Bug className="h-5 w-5 text-neon-2" />
          <h3 className="mt-2 text-sm font-semibold">Report a bug</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Tell us what broke and which chapter you were on.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <MessageSquare className="h-5 w-5 text-neon" />
          <h3 className="mt-2 text-sm font-semibold">Suggest a topic</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Want a topic explained? Let us know.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-lg border border-border bg-card p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Your name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-neon focus:outline-none"
              placeholder="Aarav Sharma"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-neon focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-neon focus:outline-none"
            placeholder="Tell us what's on your mind…"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]"
        >
          <Mail className="h-4 w-4" /> Send message
        </button>
      </form>
    </div>
  );
}
