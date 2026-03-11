"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import Image from "next/image";
import { cn } from "@/app/utils";

interface FeatureProps {
  title: string;
  subtitle: string;
  description: string;
  media: string;
  reversed?: boolean;
}

const features: FeatureProps[] = [
  {
    subtitle: "Registry Bridge & Synchronization",
    title: "Secure Minting Relayer & Carbon Lock",
    description: "Our secure API layer receives authenticated signals from the National Registry to trigger on-chain ERC-1155 issuance programmatically, using cryptographic HSM integrations and rigid Zod validation.",
    media: "/images/mock-invoice.svg",
  },
  {
    subtitle: "Global Harmonization",
    title: "CAD Trust Synchronization Engine",
    description: "Every carbon credit lifecycle event synchronizes automatically with the Climate Action Data Trust decentralized gateway, enforcing cross-border double-counting prevention and global transparency.",
    media: "/images/mock-payments.svg",
    reversed: true,
  },
];

const FeatureSection = ({ title, subtitle, description, media, reversed }: FeatureProps) => {
  return (
    <article
      className={cn(
        "flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 md:mb-56",
        reversed ? "md:flex-row-reverse" : ""
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full"
      >
        <div className="relative rounded-[24px] overflow-hidden shadow-soft-float border border-border-subtle bg-surface">
          <Image
            src={media}
            alt={title}
            width={700}
            height={450}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-left max-w-xl"
      >
        <span className="text-sm font-semibold text-brand uppercase tracking-widest block mb-4">
          {subtitle}
        </span>
        <h2 className="section-h2 text-foreground mb-6">
          {title}
        </h2>
        <p className="body-primary mb-10">
          {description}
        </p>
        <Button
          href="#templates"
          variant="secondary"
          className="border border-border-subtle"
          aria-label={`Explore infrastructure for ${title}`}
        >
          Explore infrastructure
        </Button>
      </motion.div>
    </article>
  );
};

export const Features = () => {
  return (
    <section id="features" aria-labelledby="features-heading" className="section-space bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <p className="label-meta mb-4 uppercase tracking-[0.18em] text-brand">Platform flows</p>
          <h2 id="features-heading" className="section-h2 text-foreground mb-6">
            Turn policy-backed carbon assets into market infrastructure
          </h2>
          <p className="body-primary mx-auto max-w-2xl">
            The experience is designed around sovereign oversight, project traceability, and cleaner participation for developers, registries, and carbon buyers.
          </p>
        </div>

        {features.map((feature) => (
          <FeatureSection key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};
