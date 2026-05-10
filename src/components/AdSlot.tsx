import { useEffect, useRef } from "react";

export const ADSENSE_CLIENT = "ca-pub-5234729428537235";

type AdSlotProps = {
  slot?: string;
  format?: string;
  layout?: string;
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense ad unit. Works with Auto Ads when no `slot` is provided
 * (the global AdSense script handles placement). When `slot` is provided,
 * renders a specific ad unit.
 */
export function AdSlot({
  slot,
  format = "auto",
  layout,
  className = "",
  style,
  responsive = true,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!slot) return; // Without a slot id, skip push — Auto Ads handles placement.
    // Defer to idle so it never blocks chapter navigation.
    const schedule =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = schedule(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* ignore */
      }
    });
    return () => {
      const cancel =
        (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback ?? window.clearTimeout;
      try { cancel(id as number); } catch { /* ignore */ }
    };
  }, [slot]);

  // Don't render an empty <ins> when no slot — that just gives AdSense an
  // unfilled unit on every page and contributes to navigation lag.
  if (!slot) return null;

  return (
    <div className={`my-6 flex w-full justify-center ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
