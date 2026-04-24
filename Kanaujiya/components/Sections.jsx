"use client";

const sections = [
  {
    eyebrow: "Arrival",
    title: "A minimal neon corridor that reacts like a living interface.",
    body:
      "The tunnel breathes with fluid UV distortion, scroll-linked momentum, and bloom-heavy color falloff for a cinematic first reveal.",
    align: "start",
    top: "15%",
    range: [0.02, 0.24],
  },
  {
    eyebrow: "Flow",
    title: "Motion is sculpted through shader-driven light rather than heavy geometry.",
    body:
      "Spiral UV transforms, layered noise, and faux motion trails create the sense of speed while keeping the scene efficient enough to stay smooth.",
    align: "end",
    top: "34%",
    range: [0.18, 0.42],
  },
  {
    eyebrow: "Depth",
    title: "Scroll becomes travel, with content staged along the tunnel axis.",
    body:
      "GSAP ScrollTrigger maps progress into camera movement, while each panel fades and scales with the same cinematic rhythm as the tunnel.",
    align: "start",
    top: "54%",
    range: [0.36, 0.62],
  },
  {
    eyebrow: "Signal",
    title: "Cursor input adds subtle parallax and warping to keep the scene tactile.",
    body:
      "Micro camera drift and cursor-fed shader deformation make the space feel responsive without breaking the restrained, premium visual language.",
    align: "end",
    top: "72%",
    range: [0.56, 0.82],
  },
  {
    eyebrow: "Exit",
    title: "Built for award-style presentation with a clean production-ready structure.",
    body:
      "The scene is split into focused components, tuned for mobile fallbacks, and ready for extension with more sections, media, or branded storytelling.",
    align: "start",
    top: "84%",
    range: [0.76, 1],
  },
];

function visibility(progress, [start, end]) {
  const center = (start + end) / 2;
  const spread = Math.max((end - start) / 2, 0.001);
  const value = 1 - Math.min(Math.abs(progress - center) / spread, 1);
  return value;
}

export default function Sections({ progress }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-5 top-1/2 hidden h-[42vh] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent sm:block">
        <div
          className="absolute left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-300/15 blur-2xl"
          style={{ top: `${Math.max(progress * 100 - 8, 0)}%` }}
        />
      </div>

      {sections.map((section) => {
        const amount = visibility(progress, section.range);
        const xOffset = section.align === "start" ? -30 : 30;

        return (
          <div
            key={section.eyebrow}
            className={`section-panel ${section.align === "start" ? "justify-start" : "justify-end"}`}
            style={{ top: section.top, opacity: 0.15 + amount * 0.95 }}
          >
            <article
              className="section-card rounded-[2rem] p-6 sm:p-8"
              style={{
                transform: `translate3d(${(1 - amount) * xOffset}px, ${(1 - amount) * 40}px, 0) scale(${0.92 + amount * 0.08})`,
                opacity: 0.1 + amount * 0.9,
              }}
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-cyan-100/60">
                {section.eyebrow}
              </p>
              <h2 className="max-w-xl text-2xl font-medium leading-tight text-white sm:text-4xl">
                {section.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/66 sm:text-base">
                {section.body}
              </p>
            </article>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-8 right-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/45 backdrop-blur sm:right-8">
        {Math.round(progress * 100)}% depth
      </div>
    </div>
  );
}
