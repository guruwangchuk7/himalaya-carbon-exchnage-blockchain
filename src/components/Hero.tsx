"use client";

import { Button } from "./Button";
import Image from "next/image";
import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { useScroll, useTransform, motion } from "framer-motion";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Parallax translation mapping (moves down while page scrolls down = slower relative visual speed)
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // Perspective 3D tilt
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  // Subtle scale-down effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={targetRef}
      aria-labelledby="hero-heading"
      className="hero-gradient relative min-h-screen overflow-hidden pt-48 md:pt-56 section-space"
    >
      <div
        className="absolute left-[-10%] top-12 md:top-24 w-64 md:w-96 aspect-3/2 bg-white/60 blur-3xl rounded-full"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute right-[-12%] top-24 md:top-40 w-72 md:w-105 aspect-3/2 bg-brand/20 blur-[120px] rounded-full"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-20%] w-130 md:w-195 aspect-4/3 bg-white/30 blur-[120px] rounded-full"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <header className="max-w-3xl flex flex-col items-center gap-8">
          <ScrollReveal direction="up" distance={40} delay={0.1}>
            <h1 id="hero-heading" className="display-h1 text-foreground">
              Sovereign Market<br className="hidden md:block" />
              Infrastructure Layer
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={40} delay={0.2}>
            <p className="body-primary max-w-150 font-light">
              Himalaya Carbon Engine integrates Bhutan's National Registry with global liquidity. Establish registry-grade cryptographic proof of impact with CAD Trust synchronization, secure minting relayers, and ERC-20 Carbon Pools.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={30} delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                href="/marketplace"
                className="text-base shadow-soft-float"
                aria-label="Access platform marketplace"
              >
                Access platform
              </Button>
              <Button
                href="/architecture"
                variant="secondary"
                className="text-base border border-border-subtle"
                aria-label="Read about infrastructure"
              >
                Access architecture
              </Button>
            </div>
          </ScrollReveal>
        </header>

        <section className="mt-20 w-full max-w-4xl mx-auto" style={{ perspective: "1200px" }}>
          <ScrollReveal direction="up" distance={60} delay={0.4}>
            <motion.div
              style={{
                y: imageY,
                rotateX,
                scale: imageScale,
                opacity: imageOpacity,
              }}
              className="relative w-full rounded-[40px] shadow-soft-float overflow-hidden border border-border-subtle bg-surface transform-gpu"
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl -z-10" />
              <Image
                src="/JeI7uULY0av9DxD7q7NVLTuoNc.avif"
                alt="Himalaya Carbon platform overview"
                width={1200}
                height={800}
                className="w-full h-auto object-cover dashboard-mockup"
                priority
              />
            </motion.div>
          </ScrollReveal>
        </section>
      </div>
    </section>
  );
};
