"use client";

import { useRef } from "react";
import { gsap } from "gsap";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function MagneticButton({ href, children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.18,
      y: y * 0.22,
      scale: 1.035,
      duration: 0.45,
      ease: "power3.out"
    });
  }

  function handleLeave() {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: "elastic.out(1, 0.35)"
    });
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex h-14 items-center justify-center gap-3 rounded-full border border-signal/40 bg-signal px-7 text-sm font-black uppercase tracking-[0.18em] text-abyss shadow-glow transition-colors hover:bg-frost focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-abyss ${className}`}
    >
      {children}
    </a>
  );
}
