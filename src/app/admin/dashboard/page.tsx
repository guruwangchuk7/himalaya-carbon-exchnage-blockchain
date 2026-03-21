"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, BarChart3, Database, CheckCircle2, Globe, Zap, RefreshCcw, FileText, X, Download, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { getRegistryProjects, authorizeProjectArticle6, syncCADTrust } from "@/lib/actions/registry";
import { getUserProfile } from "@/lib/actions/market";
import { StatCard, ProjectStatusRow } from "@/components/dashboard/DashboardWidgets";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const bypass = params.get("bypass") || undefined;

    const [projRes, profRes] = await Promise.all([
      getRegistryProjects(),
      getUserProfile(bypass as any)
    ]);

    if (profRes.success && profRes.data) {
      if (profRes.data.role !== "GOVERNMENT_ADMIN") {
        console.error("Admin Dashboard Guard: Role mismatch! Expected GOVERNMENT_ADMIN, got:", profRes.data.role);
        router.push("/access");
        return;
      }
      setProfile(profRes.data);
    } else {
       console.error("Admin Dashboard Guard: Profile fetch failed!", profRes.error);
       router.push("/access");
       return;
    }

    if (projRes.success && projRes.data) {
      setProjects(projRes.data);
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
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="section-h2 text-foreground mb-4">
            Registry & Simulation Command Center
          </h1>
          <p className="body-primary max-w-2xl text-muted-text">
            Confidential access to sovereign carbon issuance, Article 6.2 authorization, and global CAD Trust state management.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Issuance" value="2.4M tCO2e" icon={Database} trend="+12%" />
          <StatCard label="A6 Projects" value={`${projects.filter(p => p.isArticle6).length} Projects`} icon={Shield} />
          <StatCard label="Sync Status" value="Healthy" icon={CheckCircle2} />
          <StatCard label="Active Vintages" value={`${[...new Set(projects.map(p => p.vintageYear))].length} Years`} icon={BarChart3} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-16">
              
              {/* 1. Simulator + Project Upload (Force Visible) */}
              <section className="bg-accent text-white rounded-[48px] p-10 shadow-2xl relative overflow-hidden group border border-brand/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full -mr-20 -mt-20" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Zap className="text-brand" size={32} /> Sovereign Project Simulator
                      </h2>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">Model and issue new national carbon projects from the centralized reserve.</p>
                    </div>
                    <div className="px-5 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Simulation Mode</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all group cursor-pointer flex flex-col h-full">
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center mb-6">
                             <FileText className="text-brand" size={24} />
                          </div>
                          <h3 className="text-lg font-bold mb-2">Upload Sovereign Project</h3>
                          <p className="text-xs text-white/40 mb-6 leading-relaxed">
                            Upload mandatory project documentation, PDD, and methodology details directly to the registry data silo.
                          </p>
                        </div>
                        <Button className="w-full py-4 text-[11px] font-bold uppercase tracking-widest mt-auto">
                           Launch Upload Wizard
                        </Button>
                     </div>

                     <div className="p-8 bg-brand/10 border border-brand/20 rounded-[32px] hover:border-brand/40 transition-all flex flex-col h-full">
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                             <RefreshCcw className="text-white" size={24} />
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-brand">Simulate Issuance</h3>
                          <div className="space-y-4 mb-6">
                             <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                                <span>Projected Volume</span>
                                <span>1,200,000 tCO2e</span>
                             </div>
                             <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "65%" }}
                                  className="h-full bg-brand shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
                                />
                             </div>
                          </div>
                        </div>
                        <Button variant="secondary" className="w-full py-4 text-[11px] font-bold uppercase tracking-widest border border-white/10 mt-auto">
                           Preview ITMO Minting
                        </Button>
                     </div>
                  </div>
                </div>
              </section>

              {/* 2. Registry Issuance List */}
              <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="card-h3 m-0 flex items-center gap-3">
                     <Shield className="text-brand" size={24} /> National Registry Issuance
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-success flex items-center gap-2 bg-success/10 px-4 py-1.5 rounded-full border border-success/20">
                     <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> NCRC Sovereign Bridge
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
                      <ProjectStatusRow key={p.id} project={p} onUpdate={fetchData} />
                    ))
                  )}
                </div>
              </section>

              {/* 3. Marketplace Overseer Section (Combined) */}
              <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float">
                <h2 className="card-h3 mb-8 flex items-center gap-3">
                  <BarChart3 className="text-brand" size={24} /> Marketplace Overseer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-brand-soft rounded-3xl border border-brand/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-text mb-2">Secondary Volume (24h)</p>
                    <h3 className="text-2xl font-bold">$12.4M</h3>
                  </div>
                  <div className="p-6 bg-brand-soft rounded-3xl border border-brand/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-text mb-2">Total Bid Liquidity</p>
                    <h3 className="text-2xl font-bold">4.2M ITMOs</h3>
                  </div>
                </div>
              </section>

              {/* 4. Transparency Audit Stream (Combined) */}
              <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="card-h3 m-0 flex items-center gap-3">
                    <Globe className="text-brand" size={24} /> Transparency Audit Stream
                  </h2>
                  <Button variant="secondary" className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-border-subtle">
                     Export Registry Proof
                  </Button>
                </div>
                <div className="space-y-4">
                   {[
                      { op: "Minting Authorization", doc: "Min. Energy BT-2024-01", status: "Verified" },
                      { op: "Article 6 Settlement", doc: "ITMO Ref 4220", status: "Authorizing" },
                      { op: "Asset Proofing", doc: "Registry Proof BHU-001", status: "Live" }
                   ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50/50 p-5 rounded-3xl border border-gray-100 hover:bg-white transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center">
                              <CheckCircle2 size={20} className="text-success" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-accent">{item.op}</p>
                              <p className="text-[10px] text-muted-text uppercase tracking-tight">{item.doc}</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-bold text-success uppercase tracking-widest bg-success/10 px-3 py-1 rounded-full">
                            {item.status}
                         </span>
                      </div>
                   ))}
                </div>
              </section>
            </div>

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
            <section className="bg-accent text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/30 blur-[100px] rounded-full -z-10" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Database className="text-brand" size={24} /> Registry Statistics
                </h2>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/5 text-center">
                   <p className="text-xs text-gray-400 mb-4">Scan regional nodes to fill registry.</p>
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
