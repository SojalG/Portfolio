"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Cpu, Gem, Orbit, Sparkles, Zap } from "@/components/icons";
import { MagneticButton } from "@/components/MagneticButton";
import { ParallaxBackdrop } from "@/components/ParallaxBackdrop";
import { useGsapLanding } from "@/hooks/useGsapLanding";

const CinematicScene = dynamic(() => import("@/scenes/CinematicScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-abyss" />
});

const features = [
  {
    icon: Orbit,
    title: "Backend Engineering",
    copy: "Building scalable API-driven systems using Node.js, Express, and MongoDB with a strong focus on performance and modular design."
  },
  {
    icon: Cpu,
    title: "Data & AI Systems",
    copy: "Experience in machine learning, NLP, and computer vision using TensorFlow, OpenCV, MediaPipe, and modern AI frameworks."
  },
  {
    icon: Sparkles,
    title: "Full Stack Development",
    copy: "Creating responsive and interactive applications using React, Tailwind CSS, and efficient backend integration."
  }
];

const showcase = [
  { title: "CompileIN AI Compiler", image: "/project1.png" },
  { title: "SignBridgeAI Translator", image: "/project2.png" },
  { title: "AI Call Assistant", image: "/project3.png" },
  { title: "Mini Drone System", image: "/project4.png" }
];

export default function Home() {
  useGsapLanding();

  return (
    <main className="relative min-h-screen overflow-clip bg-abyss text-white">
      <ParallaxBackdrop />
      <CinematicScene />
      <div className="noise-overlay" />

      <nav className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a className="group flex items-center gap-3" href="#hero" aria-label="Luminara home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 shadow-glow backdrop-blur-xl">
            <Gem className="h-4 w-4 text-signal transition-transform group-hover:rotate-45" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white/82">Deepak Rathaur</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/66 md:flex">
          <a className="transition hover:text-white" href="#features">Skills</a>
          <a className="transition hover:text-white" href="#showcase">Projects</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </div>
      </nav>

      <section id="hero" className="story-section relative z-20 px-5 pt-20 md:px-8">
        <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center pt-12">
          <div className="hero-copy max-w-5xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-frost/90 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-ember" />
              Backend & AI Developer Portfolio
            </p>
            <h1 className="text-balance text-[clamp(3.75rem,13vw,10.5rem)] font-black uppercase leading-[0.82] tracking-normal">
              Deepak Rathaur
            </h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-7 md:flex-row md:items-end">
              <p className="hero-subcopy text-balance text-lg leading-8 text-white/72 md:text-xl">
                Backend-focused Computer Science student specializing in scalable systems, AI-powered applications, and real-time data processing solutions.
              </p>
              <MagneticButton href="#features" className="shrink-0">
                Explore
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section relative z-20 px-5 md:px-8" aria-label="Scroll story">
        <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="story-copy max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-signal">Phase 01</p>
            <h2 className="text-balance text-5xl font-black uppercase leading-none md:text-7xl">
              Engineering intelligent systems
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/68">
              Designing backend architectures and AI pipelines that process real-time data, enabling automation, decision-making, and scalable applications.
            </p>
          </div>
          <div className="story-meter glass h-72 rounded-lg p-5 md:h-[28rem]">
            <div className="h-full rounded-md border border-white/10 bg-black/24 p-4">
              <div className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/54">
                <span>System Architecture</span>
                <span>Active</span>
              </div>
              <div className="relative h-[calc(100%-3rem)]">
                <span className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-signal shadow-glow" />
                <span className="absolute left-[36%] top-[62%] h-3 w-3 rounded-full bg-ember shadow-ember" />
                <span className="absolute left-[74%] top-[34%] h-3 w-3 rounded-full bg-violet shadow-glow" />
                <div className="absolute inset-x-[9%] top-1/2 h-px -rotate-6 bg-gradient-to-r from-signal via-white/50 to-ember" />
                <div className="absolute inset-x-[20%] top-[38%] h-px rotate-12 bg-gradient-to-r from-transparent via-violet/70 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="story-section relative z-20 px-5 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-ember">Skills</p>
            <h2 className="text-balance text-4xl font-black uppercase leading-tight md:text-7xl">
              Technologies and expertise
            </h2>
          </div>
          <div className="feature-grid grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="glass feature-card group rounded-lg p-6 transition duration-500 hover:-translate-y-2 hover:border-signal/40 hover:bg-white/14">
                <feature.icon className="mb-10 h-8 w-8 text-signal transition duration-500 group-hover:scale-110 group-hover:text-ember" />
                <h3 className="text-2xl font-extrabold uppercase">{feature.title}</h3>
                <p className="mt-4 leading-7 text-white/64">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="story-section relative z-20 px-5 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-balance text-5xl font-black uppercase leading-none md:text-8xl">
              Key Projects
            </h2>
            <p className="max-w-md text-lg leading-8 text-white/64">
              Real-world systems including AI-powered tools, backend platforms, and embedded system innovations.
            </p>
          </div>
          <div className="showcase-grid grid gap-4 md:grid-cols-4">
            {showcase.map((item, index) => (
              <article key={item.title} className="group relative min-h-80 overflow-hidden rounded-lg border border-white/12 bg-white/7 p-5 backdrop-blur-xl">
                {/* Project Image */}
                <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,133,255,0.22),transparent_48%),linear-gradient(145deg,rgba(123,77,255,0.16),transparent)] opacity-50 mix-blend-screen transition duration-500 group-hover:scale-110" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/58 drop-shadow-md">0{index + 1}</span>
                  <h3 className="text-3xl font-black uppercase leading-none drop-shadow-lg">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="story-section relative z-20 px-5 pb-24 md:px-8">
        <div className="cta-panel glass relative mx-auto w-full max-w-6xl overflow-hidden rounded-lg px-6 py-16 text-center md:px-16 md:py-24">
          <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,rgba(177,133,255,0.2),rgba(150,108,255,0.12),rgba(123,77,255,0.2),rgba(177,133,255,0.2))] opacity-60" />
          <div className="relative">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-frost">Let’s collaborate</p>
            <h2 className="text-balance text-5xl font-black uppercase leading-none md:text-8xl">
              Build scalable and intelligent systems
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Open to internships and opportunities where I can contribute to backend systems, AI applications, and data-driven solutions.
            </p>
            <div className="mt-9 flex justify-center">
              <MagneticButton href="mailto:rathaurdeepak312@gmail.com">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}