"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager({ children, progressRef, setProgress }) {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const tweenState = { progress: 0 };

    const context = gsap.context(() => {
      gsap.to(tweenState, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollAreaRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          progressRef.current = tweenState.progress;
          setProgress(tweenState.progress);
        },
      });
    }, scrollAreaRef);

    return () => context.revert();
  }, [progressRef, setProgress]);

  return (
    <div ref={scrollAreaRef} className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {children}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-5 py-5 sm:px-8">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/50 backdrop-blur">
            Scroll to travel deeper
          </div>
          <div className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-cyan-100/70 backdrop-blur sm:block">
            Shader tunnel / R3F / GSAP
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night via-night/35 to-transparent" />
      </div>
    </div>
  );
}
