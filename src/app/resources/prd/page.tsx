"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PRDBriefPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={16} /> Back to Platform
        </Link>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-surface border border-border-subtle rounded-[48px] p-8 md:p-16 shadow-soft-float"
        >
          <div className="flex items-center gap-4 mb-8 text-brand">
             <FileText size={32} />
             <span className="text-xs font-bold uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">Internal Document</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-8">PRD Brief: Sovereign Carbon Registry</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-muted-text">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Product Vision</h2>
              <p>To build a high-performance, registry-grade infrastructure for the Kingdom of Bhutan, enabling sovereign issuance, secure Article 6 tracking, and seamless institutional market participation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Core Objectives</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sovereign Control:</strong> Enable national authorities to manage the full lifecycle of carbon assets.</li>
                <li><strong>Article 6.2 Compliance:</strong> Automate corresponding adjustments and authorization workflows.</li>
                <li><strong>Interoperability:</strong> Maintain real-time synchronization with the Climate Action Data (CAD) Trust.</li>
                <li><strong>Market Liquidity:</strong> Provide institutional-grade rails for high-volume ITMO trades.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-background p-6 rounded-2xl border border-border-subtle">
                   <h3 className="font-bold text-foreground mb-2">Automated Issuance</h3>
                   <p className="text-sm">Serial number generation linked to verified vintage datasets.</p>
                </div>
                <div className="bg-background p-6 rounded-2xl border border-border-subtle">
                   <h3 className="font-bold text-foreground mb-2">Institutional RFQs</h3>
                   <p className="text-sm">Tiered pricing and negotiation engine for sovereign-scale acquisitions.</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
