"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const inputs = [
  "CAD Trust",
  "Bhutan Climate Policy",
  "Singapore Cooperation",
  "Data Model 2.0",
  "FinTech Sandbox",
  "Verra Guidance",
];

export const PolicyInputs = () => {
  return (
    <section className="py-24 bg-surface/50 border-y border-border-subtle overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">Referenced Inputs</h3>
            <h2 className="section-h2 text-foreground">
              Referenced against policy, registry, and market infrastructure inputs
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-8">
        {/* Infinite Ticker Effect */}
        <div className="flex gap-8 whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-8 items-center"
          >
            {[...inputs, ...inputs, ...inputs, ...inputs].map((input, idx) => (
              <div
                key={idx}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-muted-text font-medium text-sm backdrop-blur-sm"
              >
                {input}
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="flex gap-8 whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-8 items-center"
          >
            {[...inputs, ...inputs, ...inputs, ...inputs].map((input, idx) => (
              <div
                key={idx}
                className="px-6 py-3 rounded-full bg-brand/5 border border-brand/10 text-brand font-medium text-sm backdrop-blur-sm"
              >
                {input}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
