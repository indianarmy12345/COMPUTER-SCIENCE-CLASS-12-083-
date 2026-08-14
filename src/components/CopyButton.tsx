import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
  label = "Copy code",
}: {
  value: string | (() => string);
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = typeof value === "function" ? value() : value;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={copy}
      aria-label={label}
      title={label}
      className={cn("h-7 px-2 text-xs", className)}
    >
      {copied ? (
        <>
          <Check className="mr-1 h-3 w-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3 w-3" /> Copy
        </>
      )}
    </Button>
  );
}
