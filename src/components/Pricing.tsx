"use client";

import { Button } from "./Button";
import { cn } from "@/app/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

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
    name: "Public Auditors",
    description: "For the public, external auditors, regulatory bodies, and media reviewing ecosystem integrity.",
    features: ["Proof of reserve monitoring", "Transparent burn audit logs", "Reserve health index access"],
    trend: { label: "Providing cryptographic proof of asset backing", tone: "warning" },
    stageCopy: {
      sandbox: { headline: "Public Proof", sublabel: "Initial ecosystem review" },
      production: { headline: "Audit Layer", sublabel: "Operational monitoring view" },
    },
  },
  {
    name: "Institutional Traders",
    description: "For corporations, carbon offset seekers, and high-volume brokers.",
    features: ["Individual ERC-1155 vintage trading", "ERC-20 Carbon Pool liquidity", "Institutional RFQ capabilities"],
    highlighted: true,
    trend: { label: "Best fit for live market fulfillment", tone: "success" },
    stageCopy: {
      sandbox: { headline: "DEX Testnet", sublabel: "Sandbox exchange" },
      production: { headline: "Live Markets", sublabel: "Active trading & retirement" },
    },
  },
  {
    name: "Sovereign Operators",
    description: "For National Carbon Registry Officials and the Ministry of Energy.",
    features: ["Secure minting relayer controls", "Institutional whitelist auth", "ITMO compliance monitoring"],
    trend: { label: "Built for true national-scale governance", tone: "success" },
    stageCopy: {
      sandbox: { headline: "Admin SDK", sublabel: "Partner testing environment" },
      production: { headline: "Master Switch", sublabel: "Live sovereign operations" },
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
        onClick={() => {
          if (plan.name !== "Observer") {
            console.log(`Access requested for ${plan.name} in ${stage} stage.`);
          }
        }}
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
        <ScrollReveal direction="up" distance={40}>
          <div className="mb-12 text-center md:mb-16">
            <p className="label-meta mb-4 uppercase tracking-[0.18em] text-brand">Ecosystem Access</p>
            <h2 id="pricing-heading" className="section-h2 mb-4 text-foreground">
              Purpose-built portals for every participant
            </h2>
            <p className="body-primary mx-auto max-w-2xl">
              Whether you are auditing proof of reserve, trading carbon pools, or managing the national registry bridge, Himalaya Carbon provides a focused workflow for your compliance needs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1} distance={20}>
          <div className="mb-10 flex justify-center">
            <AccessToggle value={stage} onChange={setStage} />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.1} direction="up" distance={30}>
              <AccessCard plan={plan} stage={stage} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
