"use client";

import { Button } from "./Button";
import { cn } from "@/app/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useState } from "react";

type AccessStage = "sandbox" | "production";

type Plan = {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  trend?: {
    label: string;
    tone: "success" | "warning";
  };
  stageCopy: Record<
    AccessStage,
    {
      headline: string;
      sublabel: string;
    }
  >;
};

const plans: Plan[] = [
  {
    name: "Observer",
    description: "For ministries, advisors, and market stakeholders reviewing the ecosystem.",
    features: ["Policy and market overview", "Read-only registry views", "Pilot brief access"],
    trend: { label: "Baseline access for ecosystem alignment", tone: "warning" },
    stageCopy: {
      sandbox: { headline: "Discovery access", sublabel: "Initial ecosystem review" },
      production: { headline: "Policy oversight", sublabel: "Operational monitoring view" },
    },
  },
  {
    name: "Project Developer",
    description: "For developers preparing projects for issuance, audit, and exchange participation.",
    features: ["Project onboarding workflows", "Metadata and evidence submission", "Priority onboarding support"],
    highlighted: true,
    trend: { label: "Best fit for active issuance pipelines", tone: "success" },
    stageCopy: {
      sandbox: { headline: "Pilot onboarding", sublabel: "Sandbox engagement" },
      production: { headline: "Issuance readiness", sublabel: "Production rollout" },
    },
  },
  {
    name: "Market Operator",
    description: "For registry operators, infrastructure partners, and institutional market participants.",
    features: ["Custom permissions", "API and integration support", "Operational governance controls"],
    trend: { label: "Built for production-scale coordination", tone: "success" },
    stageCopy: {
      sandbox: { headline: "Integration sandbox", sublabel: "Partner testing environment" },
      production: { headline: "Operational controls", sublabel: "Live market operations" },
    },
  },
];

function AccessToggle({
  value,
  onChange,
}: {
  value: AccessStage;
  onChange: (value: AccessStage) => void;
}) {
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      className="inline-grid grid-cols-2 rounded-[999px] border border-border-subtle bg-secondary-bg p-1"
    >
      <span id={groupId} className="sr-only">
        Access stage
      </span>
      {(["sandbox", "production"] as AccessStage[]).map((option) => {
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
            <span className="relative z-10">{option === "production" ? "Production" : "Sandbox"}</span>
          </button>
        );
      })}
    </div>
  );
}

function AccessCard({ plan, stage, index }: { plan: Plan; stage: AccessStage; index: number }) {
  const copy = plan.stageCopy[stage];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -8, boxShadow: "var(--shadow-lift)" }}
      className={cn(
        "relative flex h-full flex-col rounded-[24px] border border-border-subtle bg-surface p-8 shadow-soft-float md:p-10",
        plan.highlighted ? "md:-translate-y-3 md:py-12" : ""
      )}
    >
      {plan.highlighted && stage === "production" && (
        <div className="absolute right-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-white">
          Priority path
        </div>
      )}

      <header className="mb-8">
        <h3 className="card-h3 text-foreground">{plan.name}</h3>
        <p className="mt-3 text-muted-text">{plan.description}</p>
      </header>

      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold leading-none tracking-[-0.03em] text-foreground md:text-5xl">
            {copy.headline}
          </span>
          <span className="text-sm font-medium text-tertiary-text">{copy.sublabel}</span>
        </div>
      </div>

      {plan.trend && (
        <p
          className={cn(
            "mb-6 text-sm font-medium",
            plan.trend.tone === "success" ? "text-success" : "text-warning"
          )}
        >
          {plan.trend.label}
        </p>
      )}

      <ul className="mb-8 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-muted-text">
            <Check size={16} className="shrink-0 text-foreground" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={plan.name === "Observer" ? "#features" : "#subscribe"}
        variant={plan.highlighted ? "primary" : "secondary"}
        className="mt-auto w-full border border-border-subtle"
        aria-label={`${plan.name} ${stage} access`}
      >
        {plan.name === "Observer" ? "Review brief" : "Request access"}
      </Button>
    </motion.article>
  );
}

export function Pricing() {
  const [stage, setStage] = useState<AccessStage>("sandbox");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section-space bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="label-meta mb-4 uppercase tracking-[0.18em] text-brand">Access models</p>
          <h2 id="pricing-heading" className="section-h2 mb-4 text-foreground">
            Access paths for every participant
          </h2>
          <p className="body-primary mx-auto max-w-2xl">
            Compare sandbox entry with production-stage operating models for agencies, developers, and market operators without turning the section into commercial pricing.
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center">
          <AccessToggle value={stage} onChange={setStage} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <AccessCard key={plan.name} plan={plan} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
