"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      /* ───── Reveal animations ───── */
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { autoAlpha: 0, y: 48 });

      requestAnimationFrame(() => {
        const aboveFold: HTMLElement[] = [];
        const belowFold: HTMLElement[] = [];

        reveals.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 1.1) {
            aboveFold.push(el);
          } else {
            belowFold.push(el);
          }
        });

        if (aboveFold.length) {
          gsap.to(aboveFold, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.2,
          });
        }

        if (belowFold.length) {
          ScrollTrigger.batch(belowFold, {
            start: "top 90%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });
        }

        ScrollTrigger.refresh();
      });

      /* ───── Slide-in from left/right ───── */
      gsap.utils.toArray<HTMLElement>("[data-slide-left]").forEach((el) => {
        gsap.fromTo(el, { x: -80, autoAlpha: 0 }, {
          x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-slide-right]").forEach((el) => {
        gsap.fromTo(el, { x: 80, autoAlpha: 0 }, {
          x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* ───── Stagger children ───── */
      document.querySelectorAll("[data-stagger]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 60, scale: 0.97 },
          {
            autoAlpha: 1, y: 0, scale: 1,
            duration: 1, ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 86%" },
          }
        );
      });

      /* ───── Scale-up on enter ───── */
      gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
        gsap.fromTo(el, { scale: 0.88, autoAlpha: 0 }, {
          scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* ───── Parallax elements ───── */
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.15");
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      /* ───── Scroll progress bar ───── */
      const progressBar = document.querySelector("[data-progress]") as HTMLElement;
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }

      /* ───── Header hide/show ───── */
      const header = document.querySelector("[data-header]") as HTMLElement;
      if (header) {
        let lastY = window.scrollY;
        window.addEventListener("scroll", () => {
          const y = window.scrollY;
          header.classList.toggle("is-scrolled", y > 40);
          if (y > 400 && y > lastY + 2) header.classList.add("is-hidden");
          if (y < lastY - 2) header.classList.remove("is-hidden");
          lastY = y;
        }, { passive: true });
      }

      /* ───── Counter animations ───── */
      document.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number((el as HTMLElement).dataset.count);
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 2.4,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = Math.round(obj.v).toLocaleString();
                },
              });
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(el);
      });

      /* ───── Stacking cards ───── */
      mm.add("(min-width: 900px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((c, i) => c.style.setProperty("--i", String(i)));
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card, {
            scale: 0.92 + i * 0.015,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: `top ${110 + (i + 1) * 32}px`,
              scrub: true,
            },
          });
        });
      });

      /* ───── Glow cards mouse tracking ───── */
      document.querySelectorAll(".glow-card").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const me = e as MouseEvent;
          (el as HTMLElement).style.setProperty("--mx", `${me.clientX - r.left}px`);
          (el as HTMLElement).style.setProperty("--my", `${me.clientY - r.top}px`);
        });
      });

      /* ───── Section divider lines ───── */
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* ───── Floating ambient orbs ───── */
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        const dur = 5 + Math.random() * 4;
        gsap.to(el, {
          y: -25 - Math.random() * 20,
          x: 10 + Math.random() * 15,
          duration: dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* ───── Smooth anchor clicks ───── */
      document.querySelectorAll("[data-scroll-to]").forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = (a as HTMLAnchorElement).getAttribute("href");
          if (!href?.startsWith("#")) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    });

    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return null;
}
