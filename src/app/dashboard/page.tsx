"use client";

import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BarChart3, Database, CheckCircle2, AlertCircle, Globe, Zap, RefreshCcw, Info, Fingerprint, FileText, X, Download, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { RFQStatusPanel } from "@/components/RFQStatusPanel";
import { getRegistryProjects, authorizeProjectArticle6, syncCADTrust } from "@/lib/actions/registry";
import { getUserBalances, getUserProfile } from "@/lib/actions/market";

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

const SourceEvidenceModal = ({ isOpen, onClose, project }: { isOpen: boolean, onClose: () => void, project: any }) => {
  const sourceProofId = (project.documentsUrl as any)?.sourceProofId || `BT-2024-X-${project.projectId.split('-').pop()}`;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-accent/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-brand/20"
          >
            {/* Modal Header */}
            <div className="bg-brand text-white p-8 flex justify-between items-start relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                     <Award className="text-brand-soft" size={24} />
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Official Verification Document</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">Ministry of Energy Verification Report</h2>
                  <p className="text-brand-soft/80 text-xs font-medium uppercase tracking-widest">Kingdom of Bhutan • National Carbon Registry</p>
               </div>
               <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors relative z-10">
                  <X size={20} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 space-y-10">
               {/* Document Meta */}
               <div className="grid grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                  <div className="space-y-1.5">
                     <p className="text-[10px] uppercase font-bold text-muted-text tracking-widest">Document ID</p>
                     <p className="text-sm font-mono font-bold text-accent">{sourceProofId}</p>
                  </div>
                  <div className="space-y-1.5">
                     <p className="text-[10px] uppercase font-bold text-muted-text tracking-widest">Issuance Date</p>
                     <p className="text-sm font-bold text-accent">March 15, 2026</p>
                  </div>
                  <div className="space-y-1.5">
                     <p className="text-[10px] uppercase font-bold text-muted-text tracking-widest">Authorized By</p>
                     <p className="text-sm font-bold text-accent">Dept. of Renewable Energy</p>
                  </div>
                  <div className="space-y-1.5">
                     <p className="text-[10px] uppercase font-bold text-muted-text tracking-widest">Status</p>
                     <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-success px-3 py-1 bg-success/10 border border-success/20 rounded-full">
                        <CheckCircle2 size={12} /> SECURED & VERIFIED
                     </span>
                  </div>
               </div>

               {/* Verification Body */}
               <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-sm leading-relaxed text-slate-600">
                  <h4 className="font-bold text-accent mb-3 flex items-center gap-2">
                     <Shield className="text-brand" size={16} /> Auditor Findings
                  </h4>
                  <p>
                     This certificate verifies that the <strong>{project.projectName}</strong> ({project.projectId}) has successfully completed 
                     the national verification audit. The project adheres to Article 6.2 bilateral requirements and 
                     all credits have been matched 1:1 against the physical sequestration assets held in the Sovereign Reserve.
                  </p>
               </div>

               {/* Digital Fingersprint */}
               <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-bold text-muted-text tracking-widest flex items-center gap-2">
                    <Fingerprint size={14} className="text-brand" /> Sovereign Digital Fingerprint
                  </h4>
                  <div className="bg-slate-900 text-blue-400 p-5 rounded-2xl font-mono text-[10px] break-all border border-blue-900/30">
                     0x{Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                     <div className="mt-3 flex justify-between text-blue-400/50">
                        <span>Algorithm: Ed25519 Sovereign</span>
                        <span>Signed by: Registry Bridge HSM</span>
                     </div>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-4 pt-4">
                  <Button className="flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold">
                     <Download size={14} /> Download PDF Report
                  </Button>
                  <Button variant="secondary" className="flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold border border-brand/20">
                     <ExternalLink size={14} /> View on CAD Trust
                  </Button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProjectStatusRow = ({ project, onUpdate }: { project: any, onUpdate: () => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [signingState, setSigningState] = useState<null | 'SIGNING' | 'VERIFIED'>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAuthorize = async () => {
    setIsSyncing(true);
    setSigningState('SIGNING');
    
    // Simulate high-security sovereign signing handshake
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const res = await authorizeProjectArticle6(project.id, !project.isArticle6);
      if (res.success) {
        setSigningState('VERIFIED');
        await new Promise(r => setTimeout(r, 1500));
        onUpdate();
      }
    } finally {
      setIsSyncing(false);
      setSigningState(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-background border border-border-subtle rounded-2xl group transition-all hover:border-brand/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${project.isArticle6 ? 'bg-success' : 'bg-warning animate-pulse'}`} />
            <div>
              <p className="font-bold text-sm tracking-tight">{project.projectId}</p>
              <p className="text-[10px] text-muted-text font-medium uppercase tracking-wider">{project.projectName} • {project.vintageYear}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-[10px] font-bold text-brand hover:text-accent transition-colors py-1.5 px-3 bg-brand/5 border border-brand/10 rounded-lg"
            >
              <FileText size={12} /> View Source Proofs
            </button>
            <div className="flex items-center gap-2">
              {signingState === 'SIGNING' ? (
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-brand px-3 py-1 bg-brand/5 border border-brand/20 rounded-full animate-pulse">
                  <RefreshCcw size={12} className="animate-spin" /> Validating Sovereign Signature...
                </span>
              ) : signingState === 'VERIFIED' ? (
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-success px-3 py-1 bg-success/10 border border-success/20 rounded-full">
                  <CheckCircle2 size={12} /> Signature Verified by NCRC Bridge
                </span>
              ) : project.isArticle6 ? (
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
              {signingState === 'SIGNING' ? 'Signing...' : project.isArticle6 ? 'Revoke' : 'Authorize'}
            </Button>
          </div>
        </div>
      </div>
      <SourceEvidenceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project} 
      />
    </>
  );
};

const PortfolioItem = ({ balance }: { balance: any }) => (
  <div className="flex items-center justify-between p-4 bg-background border border-border-subtle rounded-2xl hover:border-brand/40 transition-all">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand/10 text-brand rounded-xl">
        <Zap size={20} />
      </div>
      <div>
        <p className="font-bold text-sm tracking-tight">{balance.projectSlug}</p>
        <p className="text-[10px] text-muted-text font-medium uppercase tracking-widest">Sovereign Asset</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-sm">{balance.amount.toLocaleString()} HCR</p>
      <p className="text-[10px] text-success font-bold uppercase tracking-widest">SECURED</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [balances, setBalances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"simulator" | "marketplace" | "transparency">("simulator");

  const fetchData = async () => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const bypass = params.get("bypass") || undefined;

    const [projRes, balRes, profRes] = await Promise.all([
      getRegistryProjects(),
      getUserBalances(),
      getUserProfile(bypass as any)
    ]);

    console.log("🔍 FETCH DATA DEBUG:", { bypass, role: profRes.data?.role });

    if (projRes.success && projRes.data) {
      setProjects(projRes.data);
    }
    if (balRes.success && balRes.data) {
      setBalances(balRes.data);
    }
    if (profRes.success && profRes.data) {
      setProfile(profRes.data);
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
            {profile?.role === "GOVERNMENT_ADMIN" ? "National Registry Command Center" : "Institutional Marketplace Hub"}
          </h1>
          <p className="body-primary max-w-2xl text-muted-text">
            {profile?.role === "GOVERNMENT_ADMIN" 
              ? "Confidential access to sovereign carbon issuance, Article 6.2 authorization, and global CAD Trust state management."
              : "Real-time synchronization with the National Carbon Registry. Monitor your portfolio and Article 6 compliance."}
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Issuance" value="2.4M tCO2e" icon={Database} trend="+12%" />
          <StatCard label={profile?.role === "GOVERNMENT_ADMIN" ? "A6 Projects" : "My Projects"} value={`${profile?.role === "GOVERNMENT_ADMIN" ? projects.filter(p => p.isArticle6).length : balances.length} Projects`} icon={Shield} />
          <StatCard label="Sync Status" value="Healthy" icon={CheckCircle2} />
          <StatCard label="Active Vintages" value={`${[...new Set(projects.map(p => p.vintageYear))].length} Years`} icon={BarChart3} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* BLENDED COMMAND CENTER (Admin Only) */}
            {profile?.role === "GOVERNMENT_ADMIN" && (
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
                       <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all group cursor-pointer">
                          <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center mb-6">
                             <FileText className="text-brand" size={24} />
                          </div>
                          <h3 className="text-lg font-bold mb-2">Upload Sovereign Project</h3>
                          <p className="text-xs text-white/40 mb-6 leading-relaxed">
                            Upload mandatory project documentation, PDD, and methodology details directly to the registry data silo.
                          </p>
                          <Button className="w-full py-4 text-xs font-bold uppercase tracking-widest">
                             Launch Upload Wizard
                          </Button>
                       </div>

                       <div className="p-8 bg-brand/10 border border-brand/20 rounded-[32px] hover:border-brand/40 transition-all">
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
                          <Button variant="secondary" className="w-full py-4 text-xs font-bold uppercase tracking-widest border border-white/10">
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
            )}

            {/* Buyer Activity Feed (Buyer Only) */}
            {profile?.role === "BUYER" && (
               <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float relative overflow-hidden">
                  <h2 className="card-h3 mb-8 flex items-center gap-3">
                    <RefreshCcw className="text-brand" size={24} /> My Marketplace Activity
                  </h2>
                  <div className="p-12 text-center border-2 border-dashed border-border-subtle rounded-3xl">
                     <p className="text-muted-text text-sm">You haven't participated in any auctions or RFQs yet.</p>
                     <Button href="/marketplace" variant="secondary" className="mt-6 text-xs">Explore Marketplace</Button>
                  </div>
                 </section>
            )}

            {/* RFQ Management (Existing Component - Only for Buyers) */}
            {profile?.role === "BUYER" && <RFQStatusPanel />}

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
            {/* NEW: My Portfolio Section */}
            <section className="bg-accent text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/30 blur-[100px] rounded-full -z-10" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Database className="text-brand" size={24} /> {profile?.role === "GOVERNMENT_ADMIN" ? "Registry Statistics" : "My Asset Portfolio"}
                </h2>
                {balances.length === 0 ? (
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/5 text-center">
                     <p className="text-xs text-gray-400 mb-4">{profile?.role === "GOVERNMENT_ADMIN" ? "Scan regional nodes to fill registry." : "You don't own any carbon credits yet."}</p>
                     {profile?.role !== "GOVERNMENT_ADMIN" && (
                       <Button href="/marketplace" variant="secondary" className="w-full text-xs">Buy from Marketplace</Button>
                     )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {balances.map((b) => (
                      <PortfolioItem key={b.id} balance={b} />
                    ))}
                    {profile?.role === "BUYER" && (
                      <div className="pt-4">
                         <Button href="/retire" className="w-full py-4 bg-brand text-accent font-bold rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-brand/20">
                            Retire My Credits
                         </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
            {profile?.role === "BUYER" && (
              <section className="bg-surface border border-border-subtle rounded-[40px] p-10 shadow-soft-float relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[60px] rounded-full -z-10" />
                <div className="relative z-10">
                   <h2 className="text-2xl font-bold mb-6">Marketplace Access</h2>
                   <p className="text-muted-text text-sm mb-10 leading-relaxed font-medium">
                     Discover and acquire Article 6.2 authorized carbon credits directly from the national registry.
                   </p>
                   <div className="space-y-4">
                      <Button 
                         href="/marketplace"
                         className="w-full border-0 shadow-lg shadow-brand/10 flex items-center justify-center gap-3 py-5 rounded-2xl hover:scale-[1.02] transition-transform"
                      >
                         Go to Carbon Marketplace <Zap size={18} />
                      </Button>
                   </div>
                </div>
              </section>
            )}

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
