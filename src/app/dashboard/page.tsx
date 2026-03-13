"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, BarChart3, Database, CheckCircle2, AlertCircle, Globe, Zap, RefreshCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { RFQStatusPanel } from "@/components/RFQStatusPanel";
import { getRegistryProjects, authorizeProjectArticle6, syncCADTrust } from "@/lib/actions/registry";

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

const ProjectStatusRow = ({ project, onUpdate }: { project: any, onUpdate: () => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleAuthorize = async () => {
    setIsSyncing(true);
    try {
      const res = await authorizeProjectArticle6(project.id, !project.isArticle6);
      if (res.success) {
        onUpdate();
      }
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-background border border-border-subtle rounded-2xl group transition-all hover:border-brand/30">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${project.isArticle6 ? 'bg-success' : 'bg-warning animate-pulse'}`} />
        <div>
          <p className="font-bold text-sm tracking-tight">{project.projectId}</p>
          <p className="text-[10px] text-muted-text font-medium uppercase tracking-wider">{project.projectName} • {project.vintageYear}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {project.isArticle6 ? (
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-success px-3 py-1 bg-success/5 border border-success/10 rounded-full">
              <CheckCircle2 size={12} /> Article 6.2 Authorized
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-warning px-3 py-1 bg-warning/5 border border-warning/10 rounded-full">
              <AlertCircle size={12} /> Pending Approval
            </span>
          )}
        </div>
        <Button 
          variant="secondary" 
          className="px-3 py-1.5 text-[9px] uppercase tracking-widest hidden group-hover:flex items-center gap-2"
          onClick={handleAuthorize}
          disabled={isSyncing}
        >
          {isSyncing ? <RefreshCcw size={10} className="animate-spin" /> : null}
          {project.isArticle6 ? 'Revoke' : 'Authorize'}
        </Button>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<any[]>([]);

  const fetchProjects = async () => {
    setIsLoading(true);
    const res = await getRegistryProjects();
    if (res.success && res.data) {
      setProjects(res.data);
    }
    setIsLoading(false);
  };

  const handleGlobalSync = async () => {
    setSyncStatus(prev => [{ id: 'Global Synchronizing...', type: 'LOADING' }, ...prev]);
    for (const p of projects) {
       await syncCADTrust(p.id);
    }
    setSyncStatus(prev => [
      { id: 'Global Hierarchy Harmonized', time: new Date(), type: 'SUCCESS' },
      ...prev.filter(s => s.type !== 'LOADING')
    ]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="section-h2 text-foreground mb-4">Registry Dashboard</h1>
          <p className="body-primary max-w-2xl text-muted-text">
            Real-time synchronization with the National Carbon Registry. Monitor issuance, Article 6 compliance, and CAD Trust data flows.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Issuance" value="2.4M tCO2e" icon={Database} trend="+12%" />
          <StatCard label="A6 Authorized" value={`${projects.filter(p => p.isArticle6).length} Projects`} icon={Shield} />
          <StatCard label="Sync Status" value="Healthy" icon={CheckCircle2} />
          <StatCard label="Active Vintages" value={`${[...new Set(projects.map(p => p.vintageYear))].length} Years`} icon={BarChart3} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Registry Authorization Section */}
            <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float relative overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="card-h3 m-0 flex items-center gap-3">
                     <Shield className="text-brand" size={24} /> Registry-Market Synchronization
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-success flex items-center gap-2 bg-success/10 px-4 py-1.5 rounded-full border border-success/20">
                     <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live CAD Trust Bridge
                  </span>
               </div>
               
               <div className="space-y-4">
                {isLoading ? (
                  <div className="p-12 text-center text-muted-text flex flex-col items-center gap-4">
                    <RefreshCcw className="animate-spin text-brand" size={32} />
                    <p className="text-sm font-medium">Fetching Sovereign Registry Data...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-border-subtle rounded-3xl">
                    <p className="text-muted-text text-sm">No institutional projects found in local registry.</p>
                  </div>
                ) : (
                  projects.map(p => (
                    <ProjectStatusRow key={p.id} project={p} onUpdate={fetchProjects} />
                  ))
                )}
              </div>

               {/* Verification Stream (UI/Simulation) */}
               <div className="mt-12 p-8 bg-brand-soft/20 border border-brand/5 rounded-[32px] relative overflow-hidden">
                  <div className="absolute right-[-2%] top-[-10%] opacity-[0.03] pointer-events-none">
                     <Database size={200} className="text-brand" />
                  </div>
                  <h3 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-6">Registry Verification Stream</h3>
                  <div className="space-y-3">
                     {[
                        { op: "Minting Authorization", doc: "Min. Energy BT-2024-01", status: "Verified" },
                        { op: "Article 6 Settlement", doc: "ITMO Ref 4220", status: "Authorizing" },
                        { op: "Asset Proofing", doc: "Registry Proof BHU-001", status: "Live" }
                     ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/60">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 size={14} className="text-success" />
                              <span className="text-xs font-bold text-accent">{item.op}</span>
                           </div>
                           <span className="text-[9px] text-tertiary-text font-mono tracking-tight">{item.doc}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* RFQ Management (Existing Component) */}
            <RFQStatusPanel />

            {/* CAD Trust Sync Section */}
            <section className="bg-surface border border-border-subtle rounded-[40px] p-10 shadow-soft-float">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="card-h3 m-0 flex items-center gap-3">
                    <Globe className="text-brand" size={20} /> CAD Trust Metadata Harmony
                  </h2>
                  <Button 
                    onClick={handleGlobalSync}
                    variant="secondary" 
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex gap-2 items-center"
                  >
                    <RefreshCcw size={14} /> Sync Global State
                  </Button>
               </div>

               <div className="space-y-4">
                  {syncStatus.map((s, i) => (
                    <div key={i} className="p-4 bg-success/5 border border-success/10 rounded-2xl flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                       <div className="flex flex-col gap-1">
                          <span className="font-bold text-accent text-sm">{s.id}</span>
                          <span className="text-[10px] text-muted-text">Article 6.2 bilateral metadata pushed to global registry.</span>
                       </div>
                       <div className="text-right">
                          <span className="text-tertiary-text font-mono text-[9px] uppercase tracking-tighter">Verified: Just now</span>
                       </div>
                    </div>
                  ))}
                  
                  {/* Historical Feed (Faded) */}
                  <div className="space-y-4 opacity-50">
                    <div className="py-4 border-b border-border-subtle flex justify-between group hover:bg-secondary-bg/5 transition-colors px-4 rounded-xl">
                      <div className="flex flex-col gap-1">
                         <span className="font-bold text-accent text-sm">Authorized ITMO Transfer</span>
                         <span className="text-[11px] text-muted-text uppercase tracking-tight">BHU-Singapore Bilateral Agreement Fulfillment</span>
                      </div>
                      <div className="text-right">
                         <span className="bg-success/10 text-success text-[9px] font-bold px-3 py-1 rounded-full block mb-1">GIN: BT-4220-X</span>
                         <span className="text-tertiary-text font-mono text-[9px]">Harmonized 7m ago</span>
                      </div>
                    </div>
                    <div className="py-4 flex justify-between group hover:bg-secondary-bg/5 transition-colors px-4 rounded-xl text-xs font-medium">
                        <span className="text-muted-text italic">Loading full CAD Trust history...</span>
                    </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            <section className="bg-accent text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/30 blur-[100px] rounded-full -z-10" />
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-6">Market Liquidity</h2>
                 <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium">
                   Manage your position in authorized carbon pools. Direct integration with Uniswap V3 for seamless exit and entry.
                 </p>
                 <div className="space-y-4">
                    <Button 
                       href="/marketplace?view=pools"
                       className="w-full bg-brand text-white border-0 hover:bg-brand/90 flex items-center justify-center gap-3 py-5 rounded-2xl shadow-xl"
                    >
                       Access Carbon Pools <Zap size={18} />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                       <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/10 text-white flex items-center justify-center gap-2 py-4 rounded-xl">
                          Swap <RefreshCcw size={16} />
                       </Button>
                       <Button variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/10 text-white flex items-center justify-center gap-2 py-4 rounded-xl">
                          Pool <Database size={16} />
                       </Button>
                    </div>
                 </div>
              </div>
            </section>

            <section className="bg-surface border border-border-subtle rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-sm font-bold m-0 uppercase tracking-widest text-accent">Institutional Trust</h2>
                 <span className="text-[10px] font-bold text-brand uppercase tracking-widest border border-brand/20 px-3 py-1 rounded-full">Article 6.2</span>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-brand-soft/30 rounded-2xl border border-brand/5">
                  <p className="text-brand text-[11px] font-bold leading-relaxed">
                    Corresponding Adjustments (CA) status: <strong className="text-accent underline decoration-brand/30 underline-offset-2">SECURED</strong> per National Registry Protocol 4.2.
                  </p>
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-success" />
                    </div>
                    <p className="text-[11px] text-muted-text font-medium">Bhutan-Singapore Bilateral Compliance Verified.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-success" />
                    </div>
                    <p className="text-[11px] text-muted-text font-medium">Double Counting Prevention (CAD Trust) Active.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
