"use client";

import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, Shield, Info, ExternalLink, BarChart3, MessageSquare, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";

const projectPools = [
  {
    id: "BHU-NATURE-POOL",
    name: "Bhutan Nature-Based Composite",
    symbol: "BNC",
    vintages: "2023 - 2024",
    liquidity: "$4.8M",
    volume: "12,500 t/day",
    tokens: "ERC-20 (Uniswap Ready)"
  },
  {
    id: "BHU-RE-POOL",
    name: "Sovereign Hydro & Biomass",
    symbol: "BHR",
    vintages: "2022 - 2024",
    liquidity: "$2.1M",
    volume: "5,200 t/day",
    tokens: "ERC-20 (Uniswap Ready)"
  }
];

const RFQModal = ({ isOpen, onClose, project }: any) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/market/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer: "Institutional Participant",
          projectId: project.id,
          amount: amount,
          purpose: "Sovereign Retirement / Secondary Market Seed"
        }),
      });
      const data = await res.json();
      if (data.rfqId) setSuccess(true);
    } catch (e) {
      alert("RFQ submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-accent/20">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface border border-border-subtle p-10 rounded-[48px] shadow-2xl max-w-lg w-full relative overflow-hidden"
      >
        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <MessageSquare className="text-brand" /> Institutional RFQ
            </h2>
            <p className="text-sm text-muted-text mb-8">
              Request a custom quote for high-volume acquisition of <strong>{project.name}</strong>. Sovereign brokers provide tiered pricing for orders above 10,000 tCO2e.
            </p>
            <div className="space-y-6">
               <div>
                  <label className="label-meta text-[10px] uppercase block mb-2">Requested Volume (tCO2e)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Min 10,000" 
                    className="w-full bg-background border border-border-subtle rounded-2xl px-6 py-4 text-xl font-bold"
                  />
               </div>
               <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !amount}
                className="w-full py-5 bg-brand text-white flex items-center justify-center gap-2"
               >
                 {isSubmitting ? "Submitting Request..." : "Submit Quote Request"} <Zap size={18} />
               </Button>
               <button onClick={onClose} className="w-full text-xs text-muted-text font-bold hover:text-accent transition-colors">Cancel Request</button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
             <div className="inline-flex items-center justify-center p-6 bg-success/10 text-success rounded-full mb-8">
                <CheckCircle2 size={48} />
             </div>
             <h2 className="text-2xl font-bold mb-4 text-accent">RFQ Submitted</h2>
             <p className="text-sm text-muted-text mb-10">Your institutional request has been logged. A sovereign broker will contact you via your registered portal.</p>
             <Button onClick={onClose} className="w-full py-4 bg-accent text-white rounded-2xl">Close Portal</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, onRFQ, onAcquire }: { project: any, onRFQ: any, onAcquire: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-surface border border-border-subtle rounded-3xl overflow-hidden shadow-soft-float hover:shadow-hover-lift transition-all group"
  >
    <div className="aspect-video relative overflow-hidden">
      <div className="absolute inset-0 bg-brand/10 group-hover:bg-brand/20 transition-colors" />
      <div className="absolute top-4 left-4 flex gap-2">
         {project.authorized && (
            <span className="flex items-center gap-1 bg-success/10 text-success text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md border border-success/20">
               <Shield size={12} /> Article 6.2
            </span>
         )}
         <span className="bg-white/80 text-foreground text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md">
            {project.vintage}
         </span>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-1">
         <p className="label-meta uppercase tracking-wider">{project.id}</p>
         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${project.riskScore?.startsWith('A') ? 'text-success border-success/20' : 'text-brand border-brand/20'}`}>
            Risk: {project.riskScore}
         </span>
      </div>
      <h3 className="card-h3 mb-2 group-hover:text-brand transition-colors line-clamp-1">{project.name}</h3>
      <p className="text-xs text-muted-text mb-6 line-clamp-1">{project.methodology}</p>
      
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="label-meta text-[11px] mb-1 uppercase tracking-tighter">Available</p>
          <p className="font-bold text-accent">{project.available}</p>
        </div>
        <div className="text-right">
          <p className="label-meta text-[11px] mb-1 uppercase tracking-tighter">Price</p>
          <p className="text-xl font-bold text-brand">{project.price}</p>
        </div>
      </div>
      
      <div className="pt-6 border-t border-border-subtle flex flex-col gap-3">
        <Button 
          className="w-full py-4 text-xs flex items-center justify-center gap-2"
          onClick={onAcquire}
        >
          Acquire Instant <Zap size={14} />
        </Button>
        <button 
          onClick={onRFQ}
          className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-muted-text hover:text-brand flex items-center justify-center gap-2 transition-colors border border-dashed border-border-subtle rounded-2xl"
        >
          Institutional RFQ <MessageSquare size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

export function MarketplaceClient({ initialProjects }: { initialProjects: any[] }) {
  const [filter, setFilter] = useState("All");
  const [rfqProject, setRfqProject] = useState<any>(null);
  const [toast, setToast] = useState<{message: string, isVisible: boolean}>({ message: "", isVisible: false });

  const showToast = (msg: string) => {
    setToast({ message: msg, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), 4000);
  };

  return (
    <div className="w-full">
      {/* Filters and Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 items-center mb-12"
      >
        <div className="relative flex-1 group w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary-text group-focus-within:text-brand transition-colors" size={20} />
           <input
             type="text"
             placeholder="Search by Project ID, Methodology or Name..."
             className="w-full pl-12 pr-4 py-4 bg-surface border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-foreground shadow-sm"
           />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none">
              <select
                className="w-full appearance-none bg-surface border border-border-subtle px-6 py-4 rounded-2xl text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-sm"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All Methodologies</option>
                <option>Nature-Based</option>
                <option>Renewable Energy</option>
                <option>Methane Avoidance</option>
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary-text pointer-events-none" size={18} />
           </div>
           
           <Button variant="secondary" className="px-6 py-4 rounded-2xl flex gap-2 items-center text-sm shadow-sm bg-surface hover:bg-surface/80">
              <ArrowUpDown size={18} /> Sort
           </Button>
        </div>
      </motion.div>

      {/* Market Segments */}
      <section className="pb-24">
         <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            <button 
              onClick={() => setFilter("All")}
              className={`px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${filter === 'All' ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted-text border-border-subtle hover:bg-surface/80'}`}
            >
              Individual Vintages
            </button>
            <button 
              onClick={() => setFilter("Pools")}
              className={`px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${filter === 'Pools' ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted-text border-border-subtle hover:bg-surface/80'}`}
            >
              ERC-20 Carbon Pools
            </button>
            <button className="px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-border-subtle text-muted-text/50 bg-background cursor-not-allowed">
              Forward Contracts (Q4)
            </button>
         </div>

         {filter === "Pools" ? (
           <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
           >
              {projectPools.map((pool) => (
                <div key={pool.id} className="bg-surface border border-border-subtle p-8 md:p-10 rounded-[40px] shadow-soft-float relative overflow-hidden group hover:border-brand/40 transition-all hover:shadow-shadow-lift">
                   <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors" />
                   <div className="flex flex-col xl:flex-row justify-between items-start mb-8 gap-4">
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1.5 rounded-full mb-4 inline-block border border-brand/20">
                            Liquidity Segment
                         </span>
                         <h3 className="text-2xl font-bold text-accent mb-2">{pool.name}</h3>
                         <p className="text-sm text-muted-text">Constituent Vintages: <span className="font-semibold text-foreground">{pool.vintages}</span></p>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-brand bg-background px-6 py-3 rounded-2xl border border-border-subtle shadow-sm font-mono tracking-tight">
                         ${pool.symbol}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 pb-10 border-b border-border-subtle">
                      <div>
                         <p className="label-meta text-[10px] mb-1">Liquidity (TVL)</p>
                         <p className="font-bold text-accent font-mono">{pool.liquidity}</p>
                      </div>
                      <div>
                         <p className="label-meta text-[10px] mb-1">Daily Volume</p>
                         <p className="font-bold text-accent font-mono">{pool.volume}</p>
                      </div>
                      <div className="sm:text-right hidden sm:block">
                         <p className="label-meta text-[10px] mb-1">Standard</p>
                         <p className="font-bold text-brand">{pool.tokens}</p>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1 py-5 flex items-center justify-center gap-2 bg-accent text-white shadow-md">
                         Trade on DEX <ExternalLink size={16} />
                      </Button>
                      <Button variant="secondary" className="flex-1 py-5 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80">
                         Mint / Redeem <Shield size={16} />
                      </Button>
                   </div>
                </div>
              ))}
           </motion.div>
         ) : (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
             {initialProjects.map((project) => (
               <ProjectCard 
                 key={project.id} 
                 project={project} 
                 onRFQ={() => setRfqProject(project)} 
                 onAcquire={() => showToast(`Initiating acquisition workflow for ${project.id}. Institutional verification required.`)}
               />
             ))}
            </motion.div>
         )}
      </section>

      <RFQModal 
        isOpen={!!rfqProject} 
        onClose={() => setRfqProject(null)} 
        project={rfqProject} 
      />

      {/* Toast Notification */}
      {toast.isVisible && (
         <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-50 bg-surface border border-brand/20 shadow-shadow-lift rounded-2xl p-4 flex items-center gap-4 max-w-sm"
         >
            <div className="bg-brand/10 p-2 rounded-full text-brand">
               <Info size={20} />
            </div>
            <p className="text-sm font-medium pr-4">{toast.message}</p>
         </motion.div>
      )}
    </div>
  );
}
