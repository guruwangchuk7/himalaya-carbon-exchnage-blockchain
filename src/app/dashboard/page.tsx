"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, ArrowUpRight, BarChart3, Database, CheckCircle2, AlertCircle, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/Button";

const StatCard = ({ label, value, icon: Icon, trend }: any) => (
  <div className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-soft-float">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-brand-soft rounded-2xl text-brand">
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <p className="label-meta mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-foreground">{value}</h3>
  </div>
);

const ComplianceStatus = ({ id, status, authorized }: any) => (
  <div className="flex items-center justify-between p-4 bg-background border border-border-subtle rounded-2xl">
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${authorized ? 'bg-success' : 'bg-warning'}`} />
      <div>
        <p className="font-bold text-sm">{id}</p>
        <p className="text-xs text-muted-text">{status}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {authorized ? (
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <CheckCircle2 size={12} /> Article 6.2 Authorized
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-warning">
          <AlertCircle size={12} /> Pending Sovereign Approval
        </span>
      )}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="section-h2 text-foreground mb-4">Registry Dashboard</h1>
          <p className="body-primary max-w-2xl">
            Real-time synchronization with the National Carbon Registry. Monitor issuance, Article 6 compliance, and CAD Trust data flows.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Issuance" value="2.4M tCO2e" icon={Database} trend="+12%" />
          <StatCard label="Article 6 Authorized" value="1.1M tCO2e" icon={Shield} />
          <StatCard label="Registry Sync Status" value="Healthy" icon={CheckCircle2} />
          <StatCard label="Active Vintages" value="14 Projects" icon={BarChart3} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-surface border border-border-subtle rounded-[40px] p-10 shadow-soft-float relative overflow-hidden group">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="card-h3 m-0 flex items-center gap-3">
                     <Shield className="text-brand" size={24} /> Registry-Market Synchronization
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-success flex items-center gap-2 bg-success/10 px-4 py-1.5 rounded-full">
                     <div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live CAD Trust Bridge
                  </span>
               </div>
               
               <div className="space-y-6">
                <ComplianceStatus id="BHU-RE-2023-001" status="Issued: 250,000 Credits" authorized={true} />
                <ComplianceStatus id="BHU-BIO-2024-004" status="Issued: 120,000 Credits" authorized={false} />
                <ComplianceStatus id="BHU-RE-2022-012" status="Issued: 500,000 Credits" authorized={true} />
                <ComplianceStatus id="BHU-FOR-2023-009" status="Issued: 75,000 Credits" authorized={true} />
              </div>

               <div className="mt-12 p-8 bg-brand-soft/30 border border-brand/5 rounded-3xl relative overflow-hidden">
                  <div className="absolute right-[-2%] top-[-10%] opacity-[0.05] pointer-events-none">
                     <Database size={200} className="text-brand" />
                  </div>
                  <h3 className="card-h3 mb-4 text-accent text-sm uppercase tracking-wide">Registry Verification Stream</h3>
                  <div className="space-y-4">
                     {[
                        { op: "Minting Authorization", doc: "Min. Energy BT-2024-01", status: "Verified" },
                        { op: "Article 6 Settlement", doc: "ITMO Ref 4220", status: "Authorizing" },
                        { op: "Asset Proofing", doc: "Registry Proof BHU-001", status: "Live" }
                     ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white">
                           <div className="flex items-center gap-4">
                              <CheckCircle2 size={16} className="text-success" />
                              <span className="text-xs font-bold text-accent">{item.op}</span>
                           </div>
                           <span className="text-[10px] text-tertiary-text font-mono truncate max-w-[120px]">{item.doc}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <section className="bg-surface border border-border-subtle rounded-3xl p-8 shadow-soft-float">
               <h2 className="card-h3 mb-6">Article 6 Traceability Logs</h2>
               <div className="text-sm text-muted-text">
                  <div className="py-4 border-b border-border-subtle flex justify-between group hover:bg-background/20 transition-colors px-4 rounded-xl">
                    <div className="flex flex-col">
                       <span className="font-bold text-accent">Authorized ITMO Transfer</span>
                       <span className="text-[11px]">BHU-Singapore Bilateral Agreement Fulfillment</span>
                    </div>
                    <span className="text-tertiary-text font-mono text-xs mt-2 self-start flex items-center gap-2">
                       7m ago <ExternalLink size={12} />
                    </span>
                  </div>
                  <div className="py-4 border-b border-border-subtle flex justify-between group hover:bg-background/20 transition-colors px-4 rounded-xl">
                    <div className="flex flex-col">
                       <span className="font-bold text-accent">CAD Trust Lifecycle Sync</span>
                       <span className="text-[11px]">Vintage BHU-RE-2023 metadata updated globally</span>
                    </div>
                    <span className="text-tertiary-text font-mono text-xs mt-2 self-start flex items-center gap-2">
                       2h ago <ExternalLink size={12} />
                    </span>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-8">
            <section className="bg-accent text-white rounded-[40px] p-10 shadow-hover-lift relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-4">Sovereign Market Actions</h2>
                 <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                   Interact directly with the sovereign registry infrastructure through high-integrity market tools.
                 </p>
                 <div className="space-y-4">
                    <Button 
                       href="/marketplace"
                       className="w-full bg-brand text-white border-0 hover:bg-brand/90 flex items-center justify-center gap-2 py-5"
                    >
                       Start Trading Credits <ArrowUpRight size={18} />
                    </Button>
                    <Button 
                       variant="secondary" 
                       className="w-full border-white/20 text-white flex items-center justify-center gap-2"
                       onClick={() => alert("Minting interface is currently in verification. Please contact the National Registry office for issuance authorizations.")}
                    >
                       Mint Tokenized Vintage <Shield size={16} />
                    </Button>
                    <Button 
                       className="w-full bg-success text-white border-0 hover:bg-success/90 flex items-center justify-center gap-2"
                       href="/retire"
                    >
                       Retire & Claim Impact <Award size={16} />
                    </Button>
                 </div>
              </div>
            </section>

            <section className="bg-white border border-border-subtle rounded-3xl p-8">
              <h2 className="card-h3 mb-4">Article 6.2 Alignment</h2>
              <div className="p-4 bg-brand-soft rounded-2xl mb-4">
                <p className="text-brand text-xs font-bold leading-normal">
                  "Ensure no double counting through Corresponding Adjustments (CA) as per national guidelines."
                </p>
              </div>
              <ul className="text-xs space-y-3 text-muted-text">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1" />
                  Real-time synchronization with CAD Trust metadata.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1" />
                  Sovereign-level control for ITMO/Article 6 status.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
