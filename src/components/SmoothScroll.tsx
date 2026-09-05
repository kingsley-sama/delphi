"use client";

import { ReactLenis } from "lenis/react";

/**
 * Wheel smoothing for the whole document.
 *
 * `root` mode renders no wrapper element and keeps the real document scrolling,
 * so `position: sticky` still resolves against true scroll offsets — the
 * program card stack and the pinned stage image depend on that.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        // Touch stays native. Smoothing a finger drag reads as lag and fights
        // the platform's own momentum; Lenis defaults this off, stated here so
        // the choice is visible.
        syncTouch: false,
        // Same-page #hash links route through Lenis instead of jumping.
        anchors: true,
        // `respectReducedMotion` defaults to true: smoothing drops to 1:1 and
        // programmatic scrolls become instant for those users.
      }}
    >
      {children}
    </ReactLenis>
  );
}
