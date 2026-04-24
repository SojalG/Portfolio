"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapLanding() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(".hero-copy", { autoAlpha: 0, y: 36, scale: 0.965 });
      gsap.set(".hero-subcopy", { autoAlpha: 0, y: 18 });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero-copy", { autoAlpha: 1, y: 0, scale: 1, duration: 1.25 }, 0.15)
        .to(".hero-subcopy", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .from("nav", { autoAlpha: 0, y: -20, duration: 0.8 }, 0.45);

      gsap.utils.toArray<HTMLElement>(".story-copy, .feature-card, .showcase-grid article, .cta-panel").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 70, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.8
            }
          }
        );
      });

      gsap.to(".story-meter", {
        yPercent: -16,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-meter",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.to(".parallax-image", {
        yPercent: 14,
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6
        }
      });

      gsap.to(".parallax-slice", {
        yPercent: -24,
        xPercent: 9,
        rotate: 13,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8
        }
      });

      gsap.to(".cta-panel", {
        backgroundPosition: "180% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-panel",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => context.revert();
  }, []);
}
