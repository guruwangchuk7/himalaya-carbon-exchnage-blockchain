"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Database, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Network, 
  Blocks 
} from "lucide-react";

const ArchitectureLayer = ({ 
  title, 
  description, 
  icon: Icon, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  delay?: number 
}) => (
  <ScrollReveal direction="up" distance={40} delay={delay}>
    <div className="group bg-surface border border-border-subtle p-8 rounded-[32px] shadow-soft-float transition-all hover:border-brand/40 flex flex-col h-full">
      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mb-6 ring-8 ring-brand/5">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">{title}</h3>
      <p className="text-muted-text leading-relaxed font-light flex-grow">
        {description}
      </p>
    </div>
  </ScrollReveal>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-muted-text font-light">
    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-none ring-4 ring-brand/5" />
    <span>{text}</span>
  </li>
);

export default function ArchitecturePage() {
  return (
    <main className="relative selection:bg-brand/20 bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand/5 to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" distance={50}>
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-brand uppercase tracking-[0.2em] mb-4 block">System Design</span>
              <h1 className="display-h1 text-foreground mb-8">
                Himalaya Carbon <br />
                Architecture
              </h1>
              <p className="text-xl text-muted-text leading-relaxed font-light max-w-2xl">
                A sovereign infrastructure layer designed for national scale. Integrating 
                secure minting bridges, cryptographic proofs, and decentralized liquidity pools.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* High-Level Overview */}
      <section className="py-24 bg-surface/50 border-y border-border-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="up" distance={40}>
              <div className="space-y-8">
                <h2 className="section-h2 text-foreground">A Unified Hybrid Infrastructure</h2>
                <p className="body-primary max-w-xl">
                  Built as a monorepo-style Next.js application, the system bridges legacy national registries with the Ethereum Ecosystem (Polygon) via a secure relayer.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                  <div className="p-6 rounded-2xl bg-white shadow-soft">
                    <p className="text-2xl font-bold text-foreground mb-2">99.9%</p>
                    <p className="text-sm text-muted-text font-medium uppercase tracking-widest">Uptime Target</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white shadow-soft">
                    <p className="text-2xl font-bold text-brand mb-2">HSM</p>
                    <p className="text-sm text-muted-text font-medium uppercase tracking-widest">Key Management</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ArchitectureLayer 
                delay={0.1}
                icon={Code2}
                title="Frontend Layer"
                description="Next.js App Router providing purpose-built portals for sovereign operators, traders, and public auditors."
              />
              <ArchitectureLayer 
                delay={0.2}
                icon={Cpu}
                title="API Relayer"
                description="Secure API routes handling signed minting requests, registry locks, and real-time synchronization."
              />
              <ArchitectureLayer 
                delay={0.3}
                icon={Blocks}
                title="Contracts"
                description="ERC-1155 and ERC-20 primitives on Polygon managing project vintages and pooled liquidity."
              />
              <ArchitectureLayer 
                delay={0.4}
                icon={ShieldCheck}
                title="Security"
                description="HMAC signature verification, Zod validation, and cryptographic unit-to-token locking."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" distance={40}>
            <div className="mb-24 text-center">
              <h2 className="section-h2 text-foreground mb-6">Core Building Blocks</h2>
              <p className="body-primary max-w-2xl mx-auto">
                Detailed technical specifications of the Himalaya Carbon engine.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blockchain Node */}
            <ScrollReveal direction="up" distance={40} delay={0.1}>
              <div className="p-10 rounded-[40px] bg-secondary-bg border border-border-subtle h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Registry Layer</h4>
                </div>
                <ul className="space-y-4">
                  <FeatureItem text="ERC-1155 Multi-token Standard" />
                  <FeatureItem text="Article 6.2 ITMO Tracking" />
                  <FeatureItem text="Sovereign Whitelist Controller" />
                  <FeatureItem text="Hard-locked Unit Mapping" />
                </ul>
              </div>
            </ScrollReveal>

            {/* API Node */}
            <ScrollReveal direction="up" distance={40} delay={0.2}>
              <div className="p-10 rounded-[40px] bg-secondary-bg border border-border-subtle h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                    <Network size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Minting Gateway</h4>
                </div>
                <ul className="space-y-4">
                  <FeatureItem text="HMAC-SHA256 Payload Signing" />
                  <FeatureItem text="Real-time CAD Trust Sync" />
                  <FeatureItem text="Relayer Transaction Management" />
                  <FeatureItem text="Bridge Integrity Monitoring" />
                </ul>
              </div>
            </ScrollReveal>

            {/* Liquidity Node */}
            <ScrollReveal direction="up" distance={40} delay={0.3}>
              <div className="p-10 rounded-[40px] bg-secondary-bg border border-border-subtle h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Liquidity Layer</h4>
                </div>
                <ul className="space-y-4">
                  <FeatureItem text="ERC-20 Carbon Pool Wrappers" />
                  <FeatureItem text="Uniswap V3 Integrations" />
                  <FeatureItem text="Automated Retirement Burn" />
                  <FeatureItem text="Proof of Reserve Dashboard" />
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 mb-24">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" distance={50}>
            <div className="bg-brand p-12 md:p-24 rounded-[60px] text-center text-white relative overflow-hidden shadow-soft-float">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10 bg-[url('/images/grid.svg')] bg-center" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to explore <br /> the infrastructure?</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a 
                    href="/dashboard"
                    className="px-10 py-5 bg-white text-brand font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-soft"
                  >
                    Launch Dashboard
                  </a>
                  <a 
                    href="/marketplace"
                    className="px-10 py-5 bg-black/20 backdrop-blur-md text-white font-bold rounded-full border border-white/20 transition-transform hover:bg-black/30 hover:scale-105 active:scale-95"
                  >
                    Visit Marketplace
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
