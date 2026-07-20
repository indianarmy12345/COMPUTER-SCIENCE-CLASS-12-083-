import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setEmail(data.session?.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setEmail(session?.user?.email ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (email === undefined) return <div className="h-8 w-16" />;

  if (!email) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link to="/auth">Sign in</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[160px] truncate text-xs text-muted-foreground sm:inline">
        {email}
      </span>
      <Button
        size="sm"
        variant="ghost"
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
