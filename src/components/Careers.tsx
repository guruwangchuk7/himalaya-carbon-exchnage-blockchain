"use client";

import { Button } from "./Button";
import { cn } from "@/app/utils";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { useId, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

type CareerStage = "intern" | "fulltime";

type Role = {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  trend?: {
    label: string;
    tone: "success" | "warning";
  };
  stageCopy: Record<
    CareerStage,
    {
      headline: string;
      sublabel: string;
    }
  >;
};

const roles: Role[] = [
  {
    name: "Frontend Engineer",
    description: "Crafting pixel-perfect, data-rich dashboards for national carbon registries and pool liquidity.",
    features: ["React & TypeScript expertise", "Data visualization (D3/Three.js)", "Performance optimization"],
    trend: { label: "Focus on Blockchain UGC frameworks", tone: "success" },
    stageCopy: {
      intern: { headline: "UGC Intern", sublabel: "Frontend prototyping & experiments" },
      fulltime: { headline: "Lead Dev", sublabel: "Core Registry Dashboard architect" },
    },
  },
  {
    name: "Blockchain Engineer",
    description: "Architecting the national-scale registry bridge and institutional carbon trading infrastructure.",
    features: ["Solidity & EVM knowledge", "Cross-chain relayer design", "Token standards (ERC-1155/20)"],
    trend: { label: "National-scale governance systems", tone: "success" },
    stageCopy: {
      intern: { headline: "Protocol Intern", sublabel: "Scripting & deployment testing" },
      fulltime: { headline: "Protocol Lead", sublabel: "Sovereign-grade smart contracts" },
    },
  },
  {
    name: "Security Engineer",
    description: "Maintaining the integrity and compliance of the Bhutan National Carbon Registry bridge.",
    features: ["Smart contract auditing", "Infrastructure hardening", "Article 6.2 ITMO compliance"],
    trend: { label: "Built for highest regulatory scrutiny", tone: "warning" },
    stageCopy: {
      intern: { headline: "Security Intern", sublabel: "Vulnerability analysis" },
      fulltime: { headline: "Master Guard", sublabel: "Registry Security & Compliance" },
    },
  },
];

function CareerToggle({
  value,
  onChange,
}: {
  value: CareerStage;
  onChange: (value: CareerStage) => void;
}) {
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      className="inline-grid grid-cols-2 rounded-[999px] border border-border-subtle bg-secondary-bg p-1"
    >
      <span id={groupId} className="sr-only">
        Career stage
      </span>
      {(["intern", "fulltime"] as CareerStage[]).map((option) => {
        const active = value === option;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={cn(
              "relative min-w-32 rounded-[999px] px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black/10",
              active ? "text-foreground" : "text-tertiary-text"
            )}
          >
            {active && (
              <motion.span
                layoutId="access-pill"
                className="absolute inset-0 rounded-[999px] bg-surface shadow-soft-float"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option === "fulltime" ? "Full-time" : "Internship"}</span>
          </button>
        );
      })}
    </div>
  );
}

function RoleCard({ role, stage, index }: { role: Role; stage: CareerStage; index: number }) {
  const copy = role.stageCopy[stage];

  return (
    <motion.article
      whileHover={{ y: -8, boxShadow: "var(--shadow-lift)" }}
      className={cn(
        "relative flex h-full flex-col rounded-[24px] border border-border-subtle bg-surface p-8 shadow-soft-float md:p-10"
      )}
    >
      <header className="mb-8">
        <h3 className="card-h3 text-foreground">{role.name}</h3>
        <p className="mt-3 text-muted-text">{role.description}</p>
      </header>

      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold leading-none tracking-[-0.03em] text-foreground md:text-5xl">
            {copy.headline}
          </span>
          <span className="text-sm font-medium text-tertiary-text">{copy.sublabel}</span>
        </div>
      </div>

      {role.trend && (
        <p
          className={cn(
            "mb-6 text-sm font-medium",
            role.trend.tone === "success" ? "text-success" : "text-warning"
          )}
        >
          {role.trend.label}
        </p>
      )}

      <ul className="mb-8 space-y-3">
        {role.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-muted-text">
            <Check size={16} className="shrink-0 text-foreground" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <Button className="w-full flex justify-center items-center gap-2" variant="primary">
          <Mail size={16} />
          <span>Apply Now</span>
        </Button>
      </div>
    </motion.article>
  );
}

export function Careers() {
  const [stage, setStage] = useState<CareerStage>("intern");

  return (
    <section id="careers" aria-labelledby="careers-heading" className="section-space bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up" distance={40}>
          <div className="mb-12 text-center md:mb-16">
            <p className="label-meta mb-4 uppercase tracking-[0.18em] text-brand">Career Opportunities</p>
            <h2 id="careers-heading" className="section-h2 mb-4 text-foreground">
              Architect the future of climate finance
            </h2>
            <p className="body-primary mx-auto max-w-2xl">
              Join our engineering team to build the first national-scale carbon exchange. We're looking for pioneers in Frontend Blockchain UGC and sovereign-grade protocols.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1} distance={20}>
          <div className="mb-10 flex justify-center">
            <CareerToggle value={stage} onChange={setStage} />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {roles.map((role, index) => (
            <ScrollReveal key={role.name} delay={index * 0.1} direction="up" distance={30} className="h-full">
              <RoleCard role={role} stage={stage} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
