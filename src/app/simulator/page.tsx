"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Server, Activity, Database, CheckCircle2, Lock, ArrowRight, ActivitySquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import { generateTestSignature } from "@/app/actions/simulate";
import { useAccount } from "wagmi";

export default function RegistrySimulator() {
  const { address } = useAccount();
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<{ time: string; msg: string; type: "info" | "success" | "error" }[]>([]);

  const [formData, setFormData] = useState({
    recipient: (address as string) || "0x0000000000000000000000000000000000000000",
    id: "1",
    amount: "5000",
    projectName: "Bhutan Forest Restoration",
    projectID: "BT-FOR-2024-001",
    unitBatchID: `BCH-${Math.floor(Math.random() * 90000) + 10000}`,
    vintageYear: "2024",
    methodology: "VM0015",
    serialNumber: `SN-BT-${Date.now()}`,
    isArticle6Authorized: true,
  });

  const addLog = (msg: string, type: "info" | "success" | "error" = "info") => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    addLog("Initializing National Registry Simulator...", "info");
    try {
      // 1. Prepare Valid Payload matching the schema
      const payloadObj = {
        recipient: formData.recipient,
        id: Number(formData.id),
        amount: Number(formData.amount),
        metadata: {
          projectName: formData.projectName,
          projectID: formData.projectID,
          unitBatchID: formData.unitBatchID,
          vintageYear: Number(formData.vintageYear),
          isArticle6Authorized: formData.isArticle6Authorized,
          methodology: formData.methodology,
          serialNumber: formData.serialNumber,
          registryLink: "https://bhutan.carbonregistry.gov",
        },
      };

      const payloadStr = JSON.stringify(payloadObj);
      addLog("Prepared JSON Metadata Payload.", "info");

      // 2. Generate HMAC-SHA256 Signature via Secure Action (Simulating the Registry Backend)
      addLog("Signing payload with Sovereign Secret (HMAC-SHA256)...", "info");
      const signature = await generateTestSignature(payloadStr);
      addLog(`Generated Signature: ${signature.substring(0, 16)}...`, "info");

      // 3. Send the Webhook to our Bridge
      addLog("Transmitting payload to /api/registry/lock...", "info");
      const res = await fetch("/api/registry/lock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Registry-Signature": signature,
        },
        body: payloadStr,
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`Sovereign Mint Successful! Hash: ${data.hash}`, "success");
      } else {
        addLog(`Relay Failed: ${data.error || "Unknown Error"}`, "error");
        if (data.details) {
          console.error("Validation Details:", data.details);
        }
      }
    } catch (e: any) {
      addLog(`Simulator Exception: ${e.message}`, "error");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-20 bg-secondary-bg/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 blur-3xl rounded-full -z-10 animate-pulse" />
        <div className="container mx-auto px-6">
          <header className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand/20">
                Integration Testing
              </span>
              <span className="flex items-center gap-2 text-brand text-xs font-bold">
                <Database size={14} className="animate-pulse" /> Mock Environment
              </span>
            </div>
            <h1 className="display-h1 mb-6">National Registry Simulator</h1>
            <p className="body-primary text-muted-text max-w-2xl">
              Simulate the government "locking" physical carbon credits resulting in an HMAC-signed webhook to the Himalaya Sovereign Bridge. Used to verify the integrity and speed of on-chain minting.
            </p>
          </header>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Section */}
            <div className="col-span-1 lg:col-span-7 bg-surface border border-border-subtle p-8 rounded-[40px] shadow-soft-float">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-subtle">
                <h3 className="card-h3 m-0 flex items-center gap-3">
                  <Server className="text-brand" size={24} /> Payload Details
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Recipient Address (Your Wallet)</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.recipient}
                       onChange={e => setFormData({...formData, recipient: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Token ID (Type)</label>
                     <input 
                       type="number"
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.id}
                       onChange={e => setFormData({...formData, id: e.target.value})}
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Amount to Issue</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.amount}
                       onChange={e => setFormData({...formData, amount: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Project Name</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.projectName}
                       onChange={e => setFormData({...formData, projectName: e.target.value})}
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Project ID</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.projectID}
                       onChange={e => setFormData({...formData, projectID: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Vintage Year</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.vintageYear}
                       onChange={e => setFormData({...formData, vintageYear: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="label-meta text-[10px] uppercase text-muted-text block mb-2">Methodology</label>
                     <input 
                       className="w-full bg-secondary-bg border border-border-subtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                       value={formData.methodology}
                       onChange={e => setFormData({...formData, methodology: e.target.value})}
                     />
                  </div>
                </div>

                <div className="pt-6 border-t border-border-subtle">
                   <Button 
                      className="w-full py-5 flex items-center justify-center gap-3 text-lg"
                      onClick={handleSimulate}
                      disabled={isSimulating}
                   >
                     {isSimulating ? <ActivitySquare className="animate-spin" /> : <Lock />} 
                     {isSimulating ? "Transmitting to Bridge..." : "Lock in Registry & Trigger Bridge"}
                   </Button>
                </div>
              </div>
            </div>

            {/* Terminal Log Section */}
            <div className="col-span-1 lg:col-span-5 bg-[#0a0f1d] border border-brand/20 p-8 rounded-[40px] shadow-2xl font-mono text-sm relative overflow-hidden flex flex-col h-[600px]">
              <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-center bg-cover pointer-events-none" />
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative z-10">
                 <h3 className="text-white font-bold flex items-center gap-3 tracking-widest uppercase text-xs">
                    <Activity className="text-brand" size={16} /> Interoperability Console
                 </h3>
                 <span className="flex items-center gap-2 text-[10px] text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live connection
                 </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 relative z-10 custom-scrollbar pr-2">
                 {logs.length === 0 ? (
                   <div className="text-gray-500 italic mt-4">Waiting for synchronization event...</div>
                 ) : (
                   logs.map((log, i) => (
                     <motion.div 
                       initial={{ opacity: 0, x: -10 }} 
                       animate={{ opacity: 1, x: 0 }} 
                       key={i} 
                       className="flex items-start gap-3"
                     >
                        <span className="text-gray-500 whitespace-nowrap">[{log.time}]</span>
                        <div className={`
                          ${log.type === 'info' ? 'text-blue-300' : ''}
                          ${log.type === 'success' ? 'text-green-400 font-bold' : ''}
                          ${log.type === 'error' ? 'text-red-400' : ''}
                          break-all
                        `}>
                           {log.type === 'success' && <CheckCircle2 size={14} className="inline mr-1 -mt-1" />}
                           {log.type === 'error' && <AlertCircle size={14} className="inline mr-1 -mt-1" />}
                           {log.msg}
                        </div>
                     </motion.div>
                   ))
                 )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
