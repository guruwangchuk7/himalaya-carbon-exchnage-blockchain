"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/utils";
import { ClipboardList, Clock3, CreditCard, Users } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const cards: CardProps[] = [
  {
    delay: 0.1,
    icon: Users,
    title: "Institutional Whitelist Admin",
    description: "A high-security sovereign portal allowing registry officials to whitelist and authorize legal entities directly on-chain via the relayer.",
    className: "min-h-[320px]",
  },
  {
    delay: 0.2,
    icon: ClipboardList,
    title: "Proof of Reserve Dashboard",
    description: "The 'Integrity Layer' providing cryptographic proof of 1:1 asset backing, comparing off-chain registry locked units against on-chain supply.",
    className: "min-h-[320px]",
  },
  {
    delay: 0.3,
    icon: CreditCard,
    title: "Integrated DEX Marketplace",
    description: "Built-in support for fractional trading of specific ERC-1155 project vintages via highly liquid ERC-20 Carbon Pools and Uniswap integrations.",
    className: "min-h-[260px]",
  },
  {
    delay: 0.4,
    icon: Clock3,
    title: "Automated Impact Certificates",
    description: "Retirement triggers the permanent burn of tokens, issuing cryptographically signed certificates with unique Global Identification Numbers.",
    className: "min-h-[260px]",
  },
];

const BentoCard = ({ title, description, icon: Icon, className, delay = 0 }: CardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, boxShadow: "var(--shadow-lift)" }}
      className={cn(
        "bg-surface rounded-3xl p-8 shadow-soft-float border border-border-subtle flex flex-col items-start transition-all cursor-default",
        className
      )}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className="card-h3 text-foreground mb-4">{title}</h3>
      <p className="text-muted-text text-lg leading-[1.6]">{description}</p>
    </motion.article>
  );
};

export const BentoGrid = () => {
  return (
    <section id="templates" aria-labelledby="templates-heading" className="section-space bg-secondary-bg/55">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 id="templates-heading" className="section-h2 text-foreground mb-6">
            Engineered for sovereign carbon infrastructure
          </h2>
          <p className="body-primary max-w-2xl mx-auto">
            The core building blocks reflect the regulatory, interoperability, and market design references captured across the project documents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 auto-rows-auto md:grid-cols-2 md:gap-8">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
