import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowRight(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Cpu(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 1.8v3M14 1.8v3M10 19.2v3M14 19.2v3M1.8 10h3M1.8 14h3M19.2 10h3M19.2 14h3" />
      <rect x="10" y="10" width="4" height="4" rx="0.8" />
    </svg>
  );
}

export function Gem(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6.4 3.5h11.2L22 9l-10 11L2 9l4.4-5.5Z" />
      <path d="M2 9h20M8.5 9 12 20M15.5 9 12 20M8.5 9l2-5.5M15.5 9l-2-5.5" />
    </svg>
  );
}

export function Orbit(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M20.2 5.6c2.1 2.1-.4 8-5.6 13.2S3.5 26.5 1.4 24.4 1.8 16.4 7 11.2 18.1 3.5 20.2 5.6Z" transform="translate(.6 -3)" />
      <path d="M4.1 5.9c2.2-2 8-.1 13 4.4s7.4 9.9 5.2 12-8 .1-13-4.4-7.4-9.9-5.2-12Z" transform="translate(-1 -2)" />
    </svg>
  );
}

export function Sparkles(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 2.5 14.1 8l5.4 2.1-5.4 2.1L12 17.5l-2.1-5.3-5.4-2.1L9.9 8 12 2.5Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6L5 16Z" />
    </svg>
  );
}

export function Zap(props: IconProps) {
  return (
    <svg suppressHydrationWarning viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" />
    </svg>
  );
}
