"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, Shield, Info, ExternalLink, BarChart3 } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, Zap, Globe, Clock, CheckCircle2 } from "lucide-react";

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

const ProjectCard = ({ project, onRFQ }: { project: any, onRFQ: any }) => (
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
          onClick={() => alert(`Initiating acquisition workflow for ${project.id}. Institutional verification required.`)}
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

export default function MarketplacePage() {
  const [filter, setFilter] = useState("All");
  const [rfqProject, setRfqProject] = useState<any>(null);

  const projects = [
    {
      id: "BHU-RE-2023-001",
      name: "Wangdue Hydropower Offset",
      vintage: 2023,
      methodology: "Renewable Energy (ACM0002)",
      authorized: true,
      available: "15,420 tCO2e",
      price: "$18.50",
      image: "/images/project-hydro.png",
      riskScore: "A+",
      coBenefits: ["SDG 7", "SDG 13", "SDG 17"]
    },
    {
      id: "BHU-BIO-2024-004",
      name: "Phobjikha Conservation Project",
      vintage: 2024,
      methodology: "Avoidance/Removal (Nature-Based)",
      authorized: false,
      available: "120,000 tCO2e",
      price: "$24.00",
      image: "/images/project-forest.png",
      riskScore: "A",
      coBenefits: ["SDG 15", "SDG 8", "SDG 1"]
    },
    {
      id: "BHU-FOR-2023-009",
      name: "Gelephu Forestation Initiative",
      vintage: 2023,
      methodology: "Reforestation (AR-ACM0003)",
      authorized: true,
      available: "45,000 tCO2e",
      price: "$22.50",
      image: "/images/project-forest.png",
      riskScore: "A+",
      coBenefits: ["SDG 13", "SDG 15", "SDG 6"]
    },
    {
      id: "BHU-RE-2022-012",
      name: "Trongsa Biomass Energy",
      vintage: 2022,
      methodology: "Methane Avoidance",
      authorized: true,
      available: "8,500 tCO2e",
      price: "$16.75",
      image: "/images/project-hydro.png",
      riskScore: "B+",
      coBenefits: ["SDG 7", "SDG 9"]
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section of Marketplace */}
      <section className="pt-40 pb-20 bg-secondary-bg/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
             <h1 className="display-h1 text-foreground mb-6">Carbon Marketplace</h1>
             <p className="body-primary">
               Browse and acquire sovereign carbon credits directly from Bhutan's national registry. All assets are CAD Trust synchronized and Article 6 compliant.
             </p>
          </div>

          {/* Filters and Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
            <div className="relative flex-1 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary-text group-focus-within:text-brand transition-colors" size={20} />
               <input
                 type="text"
                 placeholder="Search by Project ID, Methodology or Name..."
                 className="w-full pl-12 pr-4 py-4 bg-surface border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-foreground"
               />
            </div>
            
            <div className="flex gap-4">
               <div className="relative">
                  <select
                    className="appearance-none bg-surface border border-border-subtle px-6 py-4 rounded-2xl text-sm font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option>All Methodologies</option>
                    <option>Nature-Based</option>
                    <option>Renewable Energy</option>
                    <option>Methane Avoidance</option>
                  </select>
                  <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary-text pointer-events-none" size={18} />
               </div>
               
               <Button variant="secondary" className="px-6 py-4 rounded-2xl flex gap-2 items-center text-sm">
                  <ArrowUpDown size={18} /> Sort
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Transparency Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
           <div className="bg-surface border border-border-subtle rounded-[40px] p-10 shadow-soft-float">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                 <div>
                    <h2 className="card-h3 m-0 flex items-center gap-3">
                       <BarChart3 className="text-brand" size={24} /> Sovereign Price Feed
                    </h2>
                    <p className="text-sm text-muted-text mt-2">Aggregated weighted average for Authorized Article 6.2 Units.</p>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="label-meta text-[10px] uppercase">Current Index</p>
                       <p className="text-2xl font-bold text-brand">$21.45 <span className="text-xs text-success font-bold">+4.2%</span></p>
                    </div>
                    <div className="h-10 w-px bg-border-subtle hidden md:block" />
                    <div className="text-right">
                       <p className="label-meta text-[10px] uppercase">Registry Volume</p>
                       <p className="text-2xl font-bold text-accent">1.2M <span className="text-xs text-muted-text font-normal">tCO2e</span></p>
                    </div>
                 </div>
              </div>
              
              {/* Mock Price Chart */}
              <div className="h-48 w-full bg-brand-soft/20 rounded-2xl border border-brand/5 relative flex items-end px-4 pb-4 gap-2 overflow-hidden">
                 <div className="absolute inset-0 bg-linear-to-t from-brand/5 to-transparent pointer-events-none" />
                 {[40, 55, 45, 60, 50, 75, 65, 85, 80, 95, 85, 100].map((h, i) => (
                    <motion.div
                       key={i}
                       initial={{ height: 0 }}
                       animate={{ height: `${h}%` }}
                       transition={{ duration: 1, delay: i * 0.05 }}
                       className="flex-1 bg-brand rounded-t-lg opacity-40 hover:opacity-100 transition-opacity cursor-pointer group relative"
                    >
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          $19.50 + {i}%
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Market Segments */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
           <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
              <button 
                onClick={() => setFilter("All")}
                className={`px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${filter === 'All' ? 'bg-accent text-white border-accent' : 'bg-white text-muted-text border-border-subtle'}`}
              >
                Individual Vintages
              </button>
              <button 
                onClick={() => setFilter("Pools")}
                className={`px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${filter === 'Pools' ? 'bg-accent text-white border-accent' : 'bg-white text-muted-text border-border-subtle'}`}
              >
                ERC-20 Carbon Pools
              </button>
              <button className="px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-border-subtle text-muted-text opacity-50 cursor-not-allowed">
                Forward Contracts (Q4)
              </button>
           </div>

           {filter === "Pools" ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectPools.map((pool) => (
                  <div key={pool.id} className="bg-surface border border-border-subtle p-10 rounded-[40px] shadow-soft-float relative overflow-hidden group hover:border-brand/40 transition-all">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-soft px-3 py-1 rounded-full mb-4 inline-block">
                              Liquidity Segment
                           </span>
                           <h3 className="text-2xl font-bold text-accent mb-2">{pool.name}</h3>
                           <p className="text-sm text-muted-text">Constituent Vintages: {pool.vintages}</p>
                        </div>
                        <div className="text-2xl font-bold text-brand bg-white px-6 py-3 rounded-2xl border border-border-subtle shadow-sm">
                           ${pool.symbol}
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border-subtle">
                        <div>
                           <p className="label-meta text-[10px] mb-1">Liquidity (TVL)</p>
                           <p className="font-bold text-accent">{pool.liquidity}</p>
                        </div>
                        <div>
                           <p className="label-meta text-[10px] mb-1">Daily Volume</p>
                           <p className="font-bold text-accent">{pool.volume}</p>
                        </div>
                        <div className="text-right">
                           <p className="label-meta text-[10px] mb-1">Standard</p>
                           <p className="font-bold text-brand">{pool.tokens}</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <Button className="flex-1 py-5 flex items-center justify-center gap-2 bg-accent text-white">
                           Trade on DEX <ExternalLink size={16} />
                        </Button>
                        <Button variant="secondary" className="flex-1 py-5 flex items-center justify-center gap-2">
                           Mint / Redeem <Shield size={16} />
                        </Button>
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {projects.map((project) => (
                 <ProjectCard key={project.id} project={project} onRFQ={() => setRfqProject(project)} />
               ))}
             </div>
           )}
        </div>
      </section>

      <RFQModal 
        isOpen={!!rfqProject} 
        onClose={() => setRfqProject(null)} 
        project={rfqProject} 
      />

      {/* Info Section about Compliance */}
      <section className="bg-accent py-24 text-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand/20 rounded-2xl">
                       <Shield size={28} className="text-brand" />
                    </div>
                    <span className="text-brand font-bold uppercase tracking-widest text-sm text-[11px] bg-brand/10 px-3 py-1 rounded-full">Article 6.2 Compliant</span>
                 </div>
                 <h2 className="section-h2 mb-8 leading-tight">
                    Every credit transaction is sovereign-certified
                 </h2>
                 <p className="text-gray-300 body-primary mb-10 leading-relaxed">
                    Himalaya Carbon Exchange ensures that all ITMO transfers are recorded with mandatory corresponding adjustments, preventing double counting and aligning with Bhutan's national climate commitments.
                 </p>
                 <div className="flex flex-wrap gap-8">
                    <div className="flex items-start gap-4">
                       <div className="mt-1 p-1 bg-white/10 rounded-full"><Info size={16} /></div>
                       <div>
                          <p className="font-bold mb-1">CAD Trust Integration</p>
                          <p className="text-sm text-gray-400">Harmonized metadata standards.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="mt-1 p-1 bg-white/10 rounded-full"><ExternalLink size={16} /></div>
                       <div>
                          <p className="font-bold mb-1">Public Ledger</p>
                          <p className="text-sm text-gray-400">Verifiable issuance and retirement logs.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                       <span className="font-bold text-xl">Article 6 Transfer Protocol</span>
                       <span className="bg-success text-[10px] font-bold px-3 py-1 rounded-full">Active</span>
                    </div>
                    <ul className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex gap-6 items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${i === 1 ? 'bg-brand text-white' : 'bg-white/10 text-gray-400'}`}>
                            {i}
                          </div>
                          <div>
                            <p className="font-bold">{i === 1 ? 'National Registry Lock' : i === 2 ? 'ITMO Authorization' : 'Corresponding Adjustment'}</p>
                            <p className="text-sm text-gray-500">{i === 1 ? 'Securing asset in sovereign registry.' : 'Ministry approval for international trade.'}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                 </div>
                 {/* Decorative floaters */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/30 blur-3xl rounded-full -z-10" />
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full -z-10" />
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
