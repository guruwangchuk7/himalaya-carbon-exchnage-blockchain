"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImplementationPage() {
  const roadmap = [
    { 
      status: "COMPLETED", 
      title: "Core Registry Build", 
      desc: "Distributed ledger deployment withArticle 6 logic.",
      items: ["Database Schema Implementation", "Prisma/MySQL Sync Gateway", "Authentication & RBAC"]
    },
    { 
      status: "COMPLETED", 
      title: "Institutional Marketplace", 
      desc: "Enterprise-grade RFQ and instant acquisition rails.",
      items: ["Bypass Logic for Dev/Testing", "Stripe Payment Integration Ready", "Marketplace UI & Filters"]
    },
    { 
      status: "IN_PROGRESS", 
      title: "Blockchain Integration", 
      desc: "On-chain settlement and minting certificate hashes.",
      items: ["Polygon Mainnet Connectors", "Solidity Smart Contract Authorization", "On-Chain Retirement Logic"]
    },
    { 
      status: "PLANNED", 
      title: "Global Interoperability", 
      desc: "Live synchronization with the CAD Trust infrastructure.",
      items: ["CAD Trust API Harmonizer", "Cross-Border Registry Connectors", "Sovereign Audit Log Exports"]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={16} /> Dashboard
        </Link>

        <header className="mb-16">
           <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Implementation Status</h1>
           <p className="text-muted-text max-w-2xl text-lg">Real-time status of current development sprints and national carbon market milestones.</p>
        </header>

        <div className="space-y-8 relative">
           <div className="absolute left-6 top-8 bottom-8 w-px bg-border-subtle border-dashed hidden md:block" />
           
           {roadmap.map((milestone, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-8 relative items-start"
             >
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-surface border border-border-subtle shadow-md relative z-10 shrink-0 ${milestone.status === 'COMPLETED' ? 'text-success' : milestone.status === 'IN_PROGRESS' ? 'text-brand' : 'text-muted-text'}`}>
                   {milestone.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : milestone.status === 'IN_PROGRESS' ? <Clock className="animate-spin-slow" size={24} /> : <Circle size={24} />}
                </div>
                
                <div className="bg-surface border border-border-subtle p-8 md:p-10 rounded-[48px] shadow-soft-float flex-1 relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6 gap-4 flex-col sm:flex-row">
                      <div>
                         <h2 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h2>
                         <p className="text-sm text-muted-text opacity-80 leading-relaxed font-medium">{milestone.desc}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-current ${milestone.status === 'COMPLETED' ? 'text-success bg-success/5' : milestone.status === 'IN_PROGRESS' ? 'text-brand bg-brand/5' : 'text-muted-text bg-muted-text/5'}`}>
                         {milestone.status.replace("_", " ")}
                      </span>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-subtle pt-8 border-dashed">
                      {milestone.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3 text-xs font-bold text-accent uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                           <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
