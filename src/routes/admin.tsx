import { useEffect, useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail, RefreshCw, Trash2, CheckCheck } from "lucide-react";

const ADMIN_EMAIL = "lavishkumar1232@gmail.com";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — CodeLearners" },
      { name: "description", content: "Admin inbox for messages sent through the CodeLearners contact form." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

function AdminPage() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const isAdmin = !!email && email.toLowerCase() === ADMIN_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Could not load messages.");
      return;
    }
    setMessages(data as Message[]);
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  if (email === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Admin access only</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {email
            ? `You're signed in as ${email}, which isn't the admin account.`
            : "Sign in with the admin account to view contact messages."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          {email ? (
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Button>
          ) : (
            <Button asChild>
              <Link to="/auth" search={{ next: "/admin" }}>
                Sign in
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const unread = messages?.filter((m) => !m.is_read).length ?? 0;

  async function markRead(id: string) {
    const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    if (error) return toast.error("Could not update message.");
    setMessages((prev) => prev?.map((m) => (m.id === id ? { ...m, is_read: true } : m)) ?? null);
  }

  async function remove(id: string) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error("Could not delete message.");
    setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
    toast.success("Message deleted.");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact inbox</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {messages ? `${messages.length} message${messages.length === 1 ? "" : "s"}` : "Loading…"}
            {unread > 0 ? ` · ${unread} unread` : ""}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {messages?.length === 0 && (
          <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            No messages yet.
          </p>
        )}
        {messages?.map((m) => (
          <article
            key={m.id}
            className={`rounded-lg border p-4 ${m.is_read ? "border-border bg-card" : "border-neon/40 bg-neon/5"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">{m.name}</h2>
                <a
                  href={`mailto:${m.email}`}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-neon"
                >
                  <Mail className="h-3 w-3" /> {m.email}
                </a>
              </div>
              <time className="text-xs text-muted-foreground">
                {new Date(m.created_at).toLocaleString()}
              </time>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            <div className="mt-3 flex gap-2">
              {!m.is_read && (
                <Button size="sm" variant="ghost" onClick={() => markRead(m.id)}>
                  <CheckCheck className="h-4 w-4" /> Mark read
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => remove(m.id)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
