"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./Button";
import Image from "next/image";
import { useRef } from "react";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.88, 1]);
  const imageRadius = useTransform(scrollYProgress, [0, 0.8], [24, 0]);

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
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl flex flex-col items-center gap-8"
        >
          <h1 id="hero-heading" className="display-h1 text-foreground">
            Build Bhutan&apos;s sovereign<br className="hidden md:block" />
            carbon market rails
          </h1>
          <p className="body-primary max-w-150">
            Registry-grade infrastructure for carbon issuance, interoperability, and market access. Align national climate policy, CAD Trust-ready data flows, and exchange participation in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href="/marketplace"
              className="text-base shadow-soft-float"
              aria-label="Access platform"
            >
              Access platform
            </Button>
            <Button
              href="/architecture"
              variant="secondary"
              className="text-base border border-border-subtle"
              aria-label="Access architecture"
            >
              Access architecture
            </Button>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y, opacity, scale, borderRadius: imageRadius }}
          className="mt-20 relative w-full max-w-4xl mx-auto rounded-3xl shadow-soft-float overflow-hidden border border-border-subtle bg-surface"
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl -z-10" />
          <Image
            src="/JeI7uULY0av9DxD7q7NVLTuoNc.avif"
            alt="Himalaya Carbon platform overview"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};
