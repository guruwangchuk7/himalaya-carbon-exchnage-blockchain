"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Database, Key } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  const securityFeatures = [
    { title: "Sovereign HSMs", content: "National registry keys are secured in high-performance Hardware Security Modules for Article 6 authorizations." },
    { title: "RBAC Controls", content: "Strict Role-Based Access Control ensures only verified government and institutional personnel can issue assets." },
    { title: "Permanent Audit Trail", content: "Every action is logged in an immutable, cryptographic sovereign trail accessible to national auditors." },
    { title: "EVM-Grade Contracts", content: "Smart contracts are audited for secure ITMO transfer logic and double-spending prevention." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="bg-surface border border-border-subtle rounded-[56px] p-8 md:p-16 shadow-soft-float relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl -mr-20 -mt-20 rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 text-brand">
               <Database size={40} />
               <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Security & Infrastructure</h1>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 text-brand-soft">Sovereign Data Protection Protocols</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-muted-text">
               <p className="md:col-span-1 text-sm leading-relaxed border-l-2 border-brand pl-6 italic">Himalaya Carbon operates under Bhutan&apos;s National Cyber Security framework, ensuring registry-grade technical security for institutional assets.</p>
               <div className="flex gap-4 items-center md:col-span-1 bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <Key className="text-brand" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-normal">Encryption Standard: AES-256 GCM + Sovereign Key Management</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {securityFeatures.map((feat, i) => (
                 <section key={i}>
                    <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border-subtle pb-4 flex items-center gap-3">
                       <ShieldCheck className="text-success" size={20} /> {feat.title}
                    </h2>
                    <p className="text-muted-text leading-relaxed text-sm opacity-80">{feat.content}</p>
                 </section>
               ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
