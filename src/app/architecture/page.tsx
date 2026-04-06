"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Layers, Database, Shield, Zap, Globe, Link2, Cpu } from "lucide-react";

export default function ArchitecturePage() {
  const components = [
    {
      title: "Sovereign Registry",
      desc: "The core source of truth for carbon issuance. Managed by national authorities using secure distributed ledger technology to ensure absolute data integrity.",
      icon: Database,
      items: ["Asset Tokenization", "Serial Number Generation", "Project Verifications"]
    },
    {
      title: "Interoperability Layer",
      desc: "Synchronized with international standards like CAD Trust for cross-border recognition and mandatory double-counting prevention.",
      icon: Link2,
      items: ["CAD Trust Metadata Sync", "Metadata Harmonization", "API State Connectors"]
    },
    {
      title: "Market Rails",
      desc: "Institutional-grade exchange infrastructure for ITMO trading, acquisitions, and high-volume RFQ execution for sovereign entities.",
      icon: Zap,
      items: ["Tiered Liquidity Pools", "Instant On-Chain Settlements", "OTC Negotiation Engine"]
    },
    {
      title: "Governance Protocol",
      desc: "Smart-contract enforced rules for Article 6 compliance, including automated corresponding adjustments and national authorization gates.",
      icon: Shield,
      items: ["Article 6.2 Compliance", "Authorization Gates", "Ministry Level Overrides"]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-20 bg-secondary-bg/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[150px] -mr-40 -mt-40 rounded-full" />
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-brand-soft rounded-3xl flex items-center justify-center text-brand mx-auto mb-8 shadow-soft-float border border-brand/10"
          >
            <Layers size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-h1 mb-6 text-foreground tracking-tight"
          >
            Sovereign Market Architecture
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="body-primary opacity-100 text-white"
          >
            A modular, registry-grade infrastructure designed for Bhutan&apos;s carbon ecosystems, ensuring Article 6 transparency and global interoperability.
          </motion.p>
        </div>
      </section>

      {/* Modular Architecture Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {components.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border-subtle p-8 md:p-12 rounded-[56px] shadow-soft-float group hover:border-brand/30 transition-all overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-brand/10 transition-colors" />
                
                <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-brand shadow-sm border border-border-subtle group-hover:scale-110 transition-transform duration-500">
                    <comp.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-4">{comp.title}</h2>
                    <p className="text-white text-sm leading-relaxed mb-10 opacity-90 group-hover:opacity-100 transition-opacity">{comp.desc}</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {comp.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3 text-[10px] font-bold text-accent uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_8px_rgba(76,151,216,0.5)]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Stack Technical Flow */}
      <section className="py-32 bg-accent text-white overflow-hidden relative border-y border-white/5 shadow-inner">
        <div className="absolute inset-0 bg-brand/5 opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand text-xs font-bold uppercase tracking-[0.3em] mb-6 block">The Sovereign Stack</span>
              <h2 className="section-h2 mb-8 leading-tight text-white">Next-Generation Carbon Rails</h2>
              <p className="body-primary opacity-100 mb-12 text-white">
                Built on institutional-grade EVM technology, our stack ensures every carbon unit is a permanent, verifiable, and tradeable asset on the sovereign registry.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:border-brand/30 transition-colors">
                  <Globe className="text-brand mb-6" size={32} />
                  <p className="font-bold mb-2">Global Sync Protocol</p>
                  <p className="text-xs text-white/80 leading-relaxed">Automated, low-latency synchronization with the CAD Trust and regional registries.</p>
                </div>
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:border-brand/30 transition-colors">
                  <Cpu className="text-brand mb-6" size={32} />
                  <p className="font-bold mb-2">Registry-Scale Core</p>
                  <p className="text-xs text-white/80 leading-relaxed">Engineered to handle high-frequency issuance and retirement certificates at sovereign scales.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-xl">
              <div className="bg-white/5 border border-white/10 rounded-[64px] relative p-10 md:p-16 flex flex-col gap-6 shadow-2xl backdrop-blur-sm isolate">
                 <div className="absolute -z-10 inset-0 bg-linear-to-tr from-brand/20 to-transparent opacity-20" />
                 
                 {[
                   { name: "Registry Application Gateway", type: "Security Shell", desc: "Next.js 15 & RBAC Authentication" },
                   { name: "CAD Trust Data Bus", type: "API Layer", desc: "Metadata Harmonization & Sync" },
                   { name: "Sovereign Settlement Engine", type: "Smart Contracts", desc: "Solidity & Article 6 logic" },
                   { name: "Public Settlement Layer", type: "Consensus", desc: "Polygon / EVM Decentralized Ledger" }
                 ].map((layer, j) => (
                   <motion.div 
                     initial={{ x: 40, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: j * 0.15, duration: 0.6 }}
                     key={j} 
                     className="bg-accent border border-white/10 p-6 rounded-3xl flex justify-between items-center group hover:border-brand/40 hover:bg-white/5 transition-all cursor-default"
                   >
                      <div>
                        <span className="font-bold text-sm block mb-1 text-white">{layer.name}</span>
                        <span className="text-[10px] text-white/90 font-medium">{layer.desc}</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-full tracking-widest">{layer.type}</span>
                   </motion.div>
                 ))}
                 
                 <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand/40 blur-[100px] rounded-full -z-10" />
                 <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 blur-[100px] rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
