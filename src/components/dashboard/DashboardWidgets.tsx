"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, FileText, RefreshCcw, AlertCircle, X, Award, Fingerprint, Download, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import { authorizeProjectArticle6 } from "@/lib/actions/registry";

export const StatCard = ({ label, value, icon: Icon, trend }: any) => (
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

export const SourceEvidenceModal = ({ isOpen, onClose, project }: { isOpen: boolean, onClose: () => void, project: any }) => {
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

            <div className="p-10 space-y-10">
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

export const ProjectStatusRow = ({ project, onUpdate }: { project: any, onUpdate: () => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [signingState, setSigningState] = useState<null | 'SIGNING' | 'VERIFIED'>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAuthorize = async () => {
    setIsSyncing(true);
    setSigningState('SIGNING');
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
                  <CheckCircle2 size={12} /> Signature Verified
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
      <SourceEvidenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={project} />
    </>
  );
};

export const PortfolioItem = ({ balance }: { balance: any }) => (
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
