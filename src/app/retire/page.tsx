"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, CloudFog, Award, ArrowRight, Download, History, ExternalLink, Info, RefreshCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { REGISTRY_ADDRESS, REGISTRY_ABI } from "@/constants";
import type { ImpactCertificate } from "@/lib/certificates";
import { getUserBalances, retireCredits, getUserProfile } from "@/lib/actions/market";
import { useRouter } from "next/navigation";

const mockHoldings = [
  { id: 1, projectId: "BT-FOR-2024-001", name: "Bhutan Forest Restoration", amount: 5000 },
  { id: 2, projectId: "BHU-RE-2023-001", name: "Wangdue Hydropower Offset", amount: 15420 },
  { id: 3, projectId: "BHU-FOR-2023-009", name: "Gelephu Forestation", amount: 4500 },
];

export default function RetirementPage() {
  const router = useRouter();
  const { address } = useAccount();
  const [profile, setProfile] = useState<any>(null);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [selectedHolding, setSelectedHolding] = useState<any>(null);
  const [retireAmount, setRetireAmount] = useState("");
  const [retireBeneficiary, setRetireBeneficiary] = useState("");
  const [retireReason, setRetireReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoadingBalances, setIsLoadingBalances] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: hash, writeContract, isPending: isRetiring } = useWriteContract();

  const { isLoading: isWaiting, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const fetchData = async () => {
    setIsLoadingBalances(true);
    const [balRes, profRes] = await Promise.all([
      getUserBalances(),
      getUserProfile()
    ]);

    if (balRes.success && balRes.data) {
      // Map DB schema (projectSlug) to UI expected format (projectId)
      const mapped = (balRes.data as any[]).map((b: any) => ({
        id: b.id,
        projectId: b.projectSlug,
        name: b.projectName || 'Sovereign Carbon Asset',
        amount: b.amount
      }));
      setHoldings(mapped);
      if (mapped.length > 0) setSelectedHolding(mapped[0]);
    }

    if (profRes.success && profRes.data) {
      setProfile(profRes.data);
    }
    setIsLoadingBalances(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetire = async () => {
    if (!retireAmount || isNaN(Number(retireAmount)) || !selectedHolding) return;
    
    setIsProcessing(true);
    try {
      const res = await retireCredits(
        selectedHolding.projectId, 
        parseInt(retireAmount), 
        retireBeneficiary || "Anonymous Contributor",
        retireReason
      );

      if (res.success) {
        setIsSuccess(true);
        // Sync certificate data from the response
        setCertificate({
          certificateId: res.certificateId,
          retirementHash: res.retirementHash,
          cadSyncId: `CAD-${Math.random().toString(36).slice(2, 10)}`
        });
        router.refresh();
      } else {
        alert(res.error || "Retirement failed.");
      }
    } catch (e) {
      alert("Failed to process retirement.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        {!isSuccess ? (
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <span className="label-meta text-brand font-bold uppercase tracking-widest bg-brand/10 px-4 py-1 rounded-full mb-4 inline-block">Sovereign Proof of Impact</span>
              <h1 className="display-h1 text-foreground mb-6">Carbon Credit Retirement</h1>
              <p className="body-primary max-w-2xl mx-auto mb-10">
                Permanently withdraw Article 6.2 authorized units from Bhutan's national registry to claim your climate contribution. Every retirement generates a blockchain-verifiable sovereign certificate.
              </p>

              {/* Portfolio Summary Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-sm text-center">
                  <p className="label-meta mb-1 uppercase tracking-tighter">Institutional Profile</p>
                  <h3 className="text-sm font-bold text-brand uppercase truncate px-2">
                    {profile?.organization || "Institutional User"}
                  </h3>
                </div>
                <div className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-sm text-center">
                  <p className="label-meta mb-1">Total Credits</p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {holdings.reduce((acc, h) => acc + h.amount, 0).toLocaleString()} <span className="text-sm font-medium text-muted-text">HCR</span>
                  </h3>
                </div>
                <div className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-sm text-center">
                  <p className="label-meta mb-1">Active Projects</p>
                  <h3 className="text-2xl font-bold text-foreground">{holdings.length}</h3>
                </div>
                <div className="bg-surface border border-border-subtle p-6 rounded-3xl shadow-sm text-center flex flex-col items-center justify-center">
                   <a href="/dashboard" className="text-xs font-bold text-brand hover:underline flex items-center gap-1 group">
                      View Full Portfolio <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Form Side */}
              <div className="bg-surface border border-border-subtle p-8 rounded-[32px] shadow-soft-float">
                <h2 className="card-h3 mb-8 flex items-center gap-3">
                   <CloudFog className="text-brand" size={24} /> 1. Select Asset to Retire
                </h2>
                
                <div className="space-y-4 mb-10">
                  {isLoadingBalances ? (
                    <div className="p-10 text-center text-muted-text">Loading your portfolio...</div>
                  ) : holdings.length === 0 ? (
                    <div className="p-10 text-center bg-gray-50 rounded-2xl border border-dashed border-border-subtle">
                      <p className="text-sm mb-4">You don't have any credits to retire yet.</p>
                      <Button href="/marketplace" variant="secondary" className="text-xs">Go to Marketplace</Button>
                    </div>
                  ) : (
                    holdings.map((holding) => (
                      <button
                        key={holding.id}
                        onClick={() => setSelectedHolding(holding)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all ${
                          selectedHolding?.id === holding.id
                            ? "border-brand bg-brand-soft shadow-sm"
                            : "border-border-subtle bg-white hover:border-brand/40"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{holding.name}</span>
                          <span className="text-[10px] font-bold uppercase text-tertiary-text">{holding.projectId}</span>
                        </div>
                        <p className="text-sm font-medium text-brand">Available: {holding.amount.toLocaleString()} HCR</p>
                      </button>
                    ))
                  )}
                </div>

                <h2 className="card-h3 mb-6 flex items-center gap-3">
                   <Shield className="text-brand" size={24} /> 2. Retirement Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="label-meta text-xs block mb-2 uppercase font-bold tracking-wider">Amount to Retire (tCO2e)</label>
                    <input
                      type="number"
                      placeholder="Enter amount..."
                      value={retireAmount}
                      onChange={(e) => setRetireAmount(e.target.value)}
                      className="w-full px-6 py-4 bg-background border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-bold text-xl"
                    />
                  </div>
                  <div>
                    <label className="label-meta text-xs block mb-2 uppercase font-bold tracking-wider">Beneficiary Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Apple Inc., or Personal Use..."
                      value={retireBeneficiary}
                      onChange={(e) => setRetireBeneficiary(e.target.value)}
                      className="w-full px-6 py-4 bg-background border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm mb-4"
                    />
                  </div>
                  <div>
                    <label className="label-meta text-xs block mb-2 uppercase font-bold tracking-wider">Reason for Retirement (Optional)</label>
                    <textarea
                      placeholder="e.g., Corporate CSR 2024..."
                      value={retireReason}
                      onChange={(e) => setRetireReason(e.target.value)}
                      className="w-full px-6 py-4 bg-background border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm h-32"
                    />
                  </div>

                  <div className="p-6 bg-brand-soft/50 rounded-2xl border border-brand/10 mb-8">
                     <div className="flex gap-4">
                        <Info className="text-brand flex-shrink-0" size={20} />
                        <p className="text-xs text-muted-text leading-relaxed">
                          By clicking "Confirm Retirement", you are permanently burning these units from the blockchain and requesting the <strong>National Carbon Registry</strong> to mark them as retired. This action is irreversible.
                        </p>
                     </div>
                  </div>

                  <Button
                    onClick={handleRetire}
                    disabled={isProcessing || !retireAmount || !selectedHolding}
                    className="w-full py-5 text-base flex items-center justify-center gap-3 shadow-soft-float"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                        Synchronizing with Registry...
                      </>
                    ) : (
                      <>Confirm Retirement <ArrowRight size={18} /></>
                    )}
                  </Button>
                </div>
              </div>

              {/* Info Side */}
              <div className="space-y-10">
                <section className="bg-accent text-white p-8 rounded-[32px] shadow-soft-float">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <History size={24} className="text-brand" /> Why Retire credits?
                  </h3>
                  <div className="space-y-6">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      To offset your carbon footprint or meet sustainability goals, credits must be <strong>retired</strong>. Unretired credits stay on the market and cannot be used for compliance claims.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Public proof on the sovereign ledger.",
                        "Automatic sync with CAD Trust metadata.",
                        "Supports Article 6.2 corresponding adjustments.",
                        "Registry-certified impact reporting."
                      ].map((text, i) => (
                        <li key={i} className="flex gap-3 text-xs font-medium">
                          <CheckCircle2 size={16} className="text-brand mt-0.5" /> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="bg-white border border-border-subtle p-8 rounded-[32px] shadow-soft-float">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-subtle">
                     <h3 className="card-h3 m-0">Live CAD Trust Status</h3>
                     <span className="flex items-center gap-2 bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Connected
                     </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs py-2 border-b border-border-subtle/50">
                      <span className="text-muted-text">Registry Sync Frequency</span>
                      <span className="font-bold">Real-time (Article 6.2)</span>
                    </div>
                    <div className="flex justify-between text-xs py-2 border-b border-border-subtle/50">
                      <span className="text-muted-text">Integrity Layer</span>
                      <span className="font-bold text-success flex items-center gap-1">
                        High (Proof-of-Authority)
                      </span>
                    </div>
                    <div className="flex justify-between text-xs py-2">
                       <span className="text-muted-text">Last Harmony Update</span>
                       <span className="text-tertiary-text">14 minutes ago</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto space-y-12 py-20"
            >
              <div className="bg-success/5 border border-success/20 p-12 rounded-[48px] text-center shadow-lg backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-success/50 to-brand/50" />
                <div className="inline-flex items-center justify-center p-6 bg-success/10 text-success rounded-full mb-10 shadow-sm border border-success/20">
                  <Award size={64} className="animate-pulse" />
                </div>
                <h1 className="display-h1 mb-6 text-accent">Sovereign Proof of Impact</h1>
                <p className="body-primary max-w-2xl mx-auto mb-12">
                  Your units have been permanently retired from <strong>Bhutan's National Carbon Registry</strong>. This action is irreversible, synchronized with the global CAD Trust, and legally authorized for climate claims.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <Button 
                    onClick={() => window.print()}
                    className="px-10 py-5 bg-accent text-white rounded-2xl flex items-center gap-2 shadow-hover-lift"
                  >
                    <Download size={20} /> Download Sovereign Certificate
                  </Button>
                  <Button 
                    href="/transparency"
                    variant="secondary" 
                    className="px-10 py-5 rounded-2xl border border-border-subtle bg-white hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ExternalLink size={20} /> View on Registry Explorer
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-border-subtle p-10 rounded-[40px] shadow-soft-float group hover:border-brand/40 transition-all">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-text mb-8 flex items-center gap-2">
                    <Shield size={18} className="text-brand" /> Registry Sync Proof
                  </h3>
                  <ul className="space-y-6">
                    {[
                      { label: "Registry Source", val: "National Carbon Registry Council (NCRC)" },
                      { label: "Unit Status", val: isVerifying ? "Verifying..." : "Cancelled / Retired", color: "text-success" },
                      { label: "Batch Serial", val: `NR-BT-2023-${selectedHolding.projectId.split('-').pop()}` },
                      { label: "Sync ID", val: certificate?.cadSyncId || "Pending Sync..." }
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between items-center text-sm">
                        <span className="text-muted-text">{item.label}</span>
                        <span className={`font-mono font-bold ${item.color || 'text-accent'}`}>{item.val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-border-subtle p-10 rounded-[40px] shadow-soft-float group hover:border-brand/40 transition-all">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-text mb-8 flex items-center gap-2">
                    <History size={18} className="text-brand" /> Blockchain Audit Trail
                  </h3>
                  <ul className="space-y-6">
                    {[
                      { label: "Transaction Hash", val: certificate?.retirementHash ? `${certificate.retirementHash.slice(0, 8)}...${certificate.retirementHash.slice(-4)}` : "Pending..." },
                      { label: "Action Type", val: "Token Burn (ERC-1155 Proxy)" },
                      { label: "Amount Retired", val: `${retireAmount} tCO2e` },
                      { label: "Consensus Status", val: "Finalized", color: "text-success" }
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between items-center text-sm">
                        <span className="text-muted-text">{item.label}</span>
                        <span className={`font-mono font-bold ${item.color || 'text-accent'}`}>{item.val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-12 pt-6">
                <button onClick={() => setIsSuccess(false)} className="group flex items-center gap-2 text-brand font-bold text-sm tracking-tight transition-all hover:gap-4">
                  <History size={18} /> Retire more units
                </button>
                <a href="/dashboard" className="text-muted-text font-medium text-sm hover:text-accent transition-colors">
                  Return to Dashboard
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <Footer />
    </main>
  );
}
