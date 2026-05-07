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
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className={`my-6 flex w-full justify-center ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
