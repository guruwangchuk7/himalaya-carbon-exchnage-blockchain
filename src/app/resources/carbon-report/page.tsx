"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart2, ArrowLeft, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

export default function CarbonReportPage() {
  const stats = [
    { label: "Registry TVL (tCO2e)", value: "1.2M", change: "+12% QoQ" },
    { label: "Verified Vintages", value: "2022-2024", change: "Current Cycle" },
    { label: "Protocol Compliance", value: "Article 6.2", change: "PASSED" },
    { label: "Market Index", value: "$21.45/t", change: "+4.2% Peak" }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
           <div>
             <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold mb-6 hover:translate-x-[-4px] transition-all">
                <ArrowLeft size={16} /> Dashboard
             </Link>
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Sovereign Carbon Report</h1>
             <p className="text-muted-text">Statistical quarterly audit of Bhutan&apos;s National Registry (Q1 2026).</p>
           </div>
           <div className="flex gap-4">
              <span className="flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-xl text-xs font-bold border border-brand/20 uppercase tracking-widest">
                 <ShieldCheck size={14} /> Verified Registry
              </span>
              <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-xl text-xs font-bold border border-accent/20 uppercase tracking-widest">
                 <Globe size={14} /> CAD TRUST SYNCED
              </span>
           </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border-subtle p-8 rounded-[32px] shadow-sm"
             >
                <p className="text-[10px] uppercase font-bold text-muted-text tracking-[0.2em] mb-4">{stat.label}</p>
                <div className="flex justify-between items-end">
                   <p className="text-3xl font-bold font-mono tracking-tight text-accent">{stat.value}</p>
                   <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-lg">{stat.change}</span>
                </div>
             </motion.div>
           ))}
        </section>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-surface border border-border-subtle rounded-[48px] p-10 md:p-16 mb-12 shadow-soft-float overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl -mr-20 -mt-20 rounded-full" />
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <BarChart2 className="text-brand" size={24} /> Audit Methodology and Findings
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-muted-text leading-relaxed">
                 <div className="space-y-6 text-sm">
                    <p>The sovereign carbon portfolio is audited monthly against strict Article 6.2 ITMO requirements. Our findings for Q1 2026 confirm that 100% of issued units are linked to corresponding adjustments within the national climate accounts.</p>
                    <p>Current issuance is heavily weighted toward high-integrity forest restoration and community bioenergy projects, reflecting Bhutan&apos;s commitment to maintaining its carbon-negative status while enabling international participation.</p>
                 </div>
                 <div className="bg-background rounded-3xl p-8 border border-border-subtle border-dashed">
                    <p className="text-[10px] uppercase font-bold text-brand tracking-widest mb-6">Article 6 Performance</p>
                    <div className="space-y-4">
                       {[
                         { l: "Authorization Issuance", v: "100%" },
                         { l: "Registry Sync Latency", v: "< 2.4s" },
                         { l: "Corresponding Adjustments", v: "ACTIVE" }
                       ].map((item, j) => (
                         <div key={j} className="flex justify-between items-center text-xs pb-3 border-b border-border-subtle border-dashed last:border-0 last:pb-0">
                            <span className="font-medium">{item.l}</span>
                            <span className="font-bold text-foreground bg-accent/10 px-2 py-1 rounded">{item.v}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
