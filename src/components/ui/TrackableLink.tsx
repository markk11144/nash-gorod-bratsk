"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  children: ReactNode;
};

export function TrackableLink({ event, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(action) => {
        trackEvent(event, { href: props.href });
        onClick?.(action);
      }}
    >
      {children}
    </a>
  );
}
