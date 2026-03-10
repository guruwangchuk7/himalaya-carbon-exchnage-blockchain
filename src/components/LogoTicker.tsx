"use client";

import { motion } from "framer-motion";
import { Globe, Leaf, Wind, Database, Shield, Zap } from "lucide-react";

const Logos = [
  { icon: Globe, name: "CAD Trust" },
  { icon: Leaf, name: "Bhutan Climate Policy" },
  { icon: Wind, name: "Singapore Cooperation" },
  { icon: Database, name: "Data Model 2.0" },
  { icon: Shield, name: "FinTech Sandbox" },
  { icon: Zap, name: "Verra Guidance" },
];

export const LogoTicker = () => {
  return (
    <section aria-label="Trusted by" className="overflow-hidden bg-background py-20 relative">
      <div className="container mx-auto px-6 text-center mb-10">
        <p className="label-meta uppercase tracking-[0.18em]">
          Referenced against policy, registry, and market infrastructure inputs
        </p>
      </div>
      
      <div className="relative overflow-hidden w-full flex items-center">
        <div className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-linear-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-linear-to-l from-background to-transparent" />
        
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap gap-16 md:gap-32 px-10"
        >
          {[...Logos, ...Logos, ...Logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
              <logo.icon size={32} className="group-hover:text-brand" aria-hidden="true" />
              <span className="text-xl font-bold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
