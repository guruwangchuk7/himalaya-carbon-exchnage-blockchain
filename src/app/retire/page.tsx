"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, CloudFog, Award, ArrowRight, Download, History, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";

const mockHoldings = [
  { id: "BHU-RE-2023-001", name: "Wangdue Hydropower", amount: 500 },
  { id: "BHU-FOR-2023-009", name: "Gelephu Forestation", amount: 1250 },
  { id: "BHU-RE-2022-012", name: "Trongsa Biomass", amount: 215 },
];

export default function RetirementPage() {
  const [selectedHolding, setSelectedHolding] = useState(mockHoldings[0]);
  const [retireAmount, setRetireAmount] = useState("");
  const [retireReason, setRetireReason] = useState("");
  const [isRetiring, setIsRetiring] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRetire = async () => {
    if (!retireAmount || isNaN(Number(retireAmount))) return;
    setIsRetiring(true);
    // Simulate smart contract interaction and CAD Trust sync
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsRetiring(false);
    setIsSuccess(true);
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
              <p className="body-primary max-w-2xl mx-auto">
                Permanently withdraw Article 6.2 authorized units from Bhutan's national registry to claim your climate contribution. Every retirement generates a blockchain-verifiable sovereign certificate.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Form Side */}
              <div className="bg-surface border border-border-subtle p-8 rounded-[32px] shadow-soft-float">
                <h2 className="card-h3 mb-8 flex items-center gap-3">
                   <CloudFog className="text-brand" size={24} /> 1. Select Asset to Retire
                </h2>
                
                <div className="space-y-4 mb-10">
                  {mockHoldings.map((holding) => (
                    <button
                      key={holding.id}
                      onClick={() => setSelectedHolding(holding)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedHolding.id === holding.id
                          ? "border-brand bg-brand-soft shadow-sm"
                          : "border-border-subtle bg-white hover:border-brand/40"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">{holding.name}</span>
                        <span className="text-[10px] font-bold uppercase text-tertiary-text">{holding.id}</span>
                      </div>
                      <p className="text-sm font-medium text-brand">Available: {holding.amount} HCR</p>
                    </button>
                  ))}
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
                    <label className="label-meta text-xs block mb-2 uppercase font-bold tracking-wider">Reason for Retirement (Optional)</label>
                    <textarea
                      placeholder="e.g., Corporate CSR 2024..."
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
                    disabled={isRetiring || !retireAmount}
                    className="w-full py-5 text-base flex items-center justify-center gap-3 shadow-soft-float"
                  >
                    {isRetiring ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
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
              className="max-w-3xl mx-auto text-center py-20"
            >
              <div className="inline-flex items-center justify-center p-6 bg-success/10 text-success rounded-full mb-10 shadow-sm border border-success/20">
                <Award size={64} className="animate-bounce" />
              </div>
              <h1 className="display-h1 mb-6">Retirement Confirmed!</h1>
              <p className="body-primary max-w-xl mx-auto mb-12">
                Your units have been permanently retired from the world's first net-negative sovereign registry. You are now authorized to claim their climate impact.
              </p>

              <div className="bg-white border border-border-subtle rounded-[40px] p-12 mb-12 shadow-hover-lift relative overflow-hidden group">
                 {/* Certificate Background watermark */}
                 <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
                    <Award size={400} className="text-accent" />
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center">
                   <div className="flex items-center gap-3 mb-8">
                      <Shield className="text-brand" size={32} />
                      <span className="text-xl font-bold tracking-tight text-accent">Himalaya Sovereign Impact</span>
                   </div>
                   <div className="w-full h-px bg-border-subtle mb-10" />
                   
                   <p className="label-meta mb-10 uppercase tracking-[0.2em] text-brand">Certificate of Climate contribution</p>
                   <h2 className="text-3xl font-bold mb-6 text-accent">OFFICIAL REGISTRY PROOF № BHU-HCR-2024-00431</h2>
                   
                   <p className="text-xl font-medium text-muted-text mb-12 italic leading-relaxed">
                     "Certified by the National Carbon Registry of Bhutan that <strong>{retireAmount} tCO2e</strong> have been permanently retired from <strong>{selectedHolding.name}</strong> vintage 2023."
                   </p>
                   
                   <div className="grid grid-cols-2 gap-12 w-full max-w-lg mb-12">
                      <div className="text-left">
                         <p className="label-meta text-[10px] mb-1">Impact Origin</p>
                         <p className="font-bold text-sm">Bhutan Nature Sinks</p>
                      </div>
                      <div className="text-right">
                         <p className="label-meta text-[10px] mb-1">CAD Trust Sync ID</p>
                         <p className="font-bold text-sm truncate">BHU-P-022::{selectedHolding.id.split('-').pop()}</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <Button variant="secondary" className="flex items-center gap-2 border-border-subtle bg-white hover:bg-gray-50">
                         <Download size={18} /> Download Certificate
                      </Button>
                      <Button className="flex items-center gap-2">
                         <ExternalLink size={18} /> View on Registry Explorer
                      </Button>
                   </div>
                 </div>
              </div>

              <div className="flex justify-center gap-8">
                 <button onClick={() => setIsSuccess(false)} className="text-brand font-bold text-sm hover:underline flex items-center gap-2">
                   <History size={16} /> Retire more units
                 </button>
                 <a href="/dashboard" className="text-muted-text font-medium text-sm hover:text-foreground">
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
