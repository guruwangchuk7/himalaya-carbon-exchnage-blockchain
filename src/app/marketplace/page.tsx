import { Navbar } from "@/components/Navbar";
import { Shield, Info, ExternalLink, BarChart3 } from "lucide-react";
import { MarketplaceClient } from "@/components/MarketplaceClient";
import { getMarketplaceProjects } from "@/lib/actions/market";
import * as motion from "framer-motion/client";

// Fallback data if DB is empty/unconfigured
const fallbackProjects = [
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
  }
];

export default async function MarketplacePage() {
  const result = await getMarketplaceProjects();
  const projects = result.success && result.data && result.data.length > 0 
    ? result.data 
    : fallbackProjects;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section of Marketplace */}
      <section className="pt-40 pb-20 bg-secondary-bg/30 relative">
        <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full translate-y-[-50%] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-12">
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="display-h1 text-foreground mb-6"
             >
               Carbon Marketplace
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="body-primary"
             >
               Browse and acquire sovereign carbon credits directly from Bhutan's national registry. All assets are CAD Trust synchronized and Article 6 compliant.
               {result.source === "SUPABASE" && (
                 <span className="block mt-2 text-xs text-brand font-bold uppercase tracking-widest">
                   ● Powered by High-Performance Sovereign Indexer
                 </span>
               )}
             </motion.p>
          </div>

          <MarketplaceClient initialProjects={projects} />
        </div>
      </section>

      {/* Market Transparency Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
           <div className="bg-surface border border-border-subtle rounded-[40px] p-6 pt-10 md:p-10 shadow-soft-float relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-soft to-accent opacity-50" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                 <div>
                    <h2 className="card-h3 m-0 flex items-center gap-3">
                       <BarChart3 className="text-brand" size={24} /> Sovereign Price Feed
                    </h2>
                    <p className="text-sm text-muted-text mt-2">Aggregated weighted average for Authorized Article 6.2 Units.</p>
                 </div>
                 <div className="flex items-center gap-6 bg-background rounded-2xl p-4 border border-border-subtle border-dashed">
                    <div className="text-right">
                       <p className="label-meta text-[10px] uppercase tracking-widest text-muted-text">Current Index</p>
                       <p className="text-2xl font-bold text-brand font-mono tracking-tight">$21.45 <span className="text-sm text-success font-bold ml-1">+4.2%</span></p>
                    </div>
                    <div className="h-10 w-px bg-border-subtle" />
                    <div className="text-right">
                       <p className="label-meta text-[10px] uppercase tracking-widest text-muted-text">Registry Volume</p>
                       <p className="text-2xl font-bold text-accent font-mono tracking-tight">1.2M <span className="text-xs text-muted-text font-sans">tCO2e</span></p>
                    </div>
                 </div>
              </div>
              
              <div className="h-64 md:h-80 w-full bg-background/50 rounded-3xl border border-border-subtle relative flex items-end px-3 sm:px-6 pb-6 pt-16 gap-1 sm:gap-3 overflow-hidden shadow-inner isolate">
                 <div className="absolute inset-0 bg-linear-to-t from-brand/10 via-brand/5 to-transparent pointer-events-none -z-10" />
                 <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 px-6 opacity-20 -z-10">
                    {[1,2,3,4].map(i => <div key={i} className="border-b border-dashed border-accent w-full flex-1" />)}
                 </div>

                 {[40, 55, 45, 60, 50, 75, 65, 85, 80, 95, 85, 100].map((h, i) => (
                    <div
                       key={i}
                       style={{ height: `${h}%` }}
                       className="flex-1 rounded-t-xl group relative cursor-pointer"
                    >
                       <div className="absolute inset-x-0 bottom-0 top-0 bg-linear-to-t from-brand/80 to-brand-soft rounded-t-xl opacity-60 group-hover:opacity-100 transition-all shadow-[0_4px_20px_rgba(76,151,216,0.1)] group-hover:shadow-[0_4px_25px_rgba(76,151,216,0.4)]" />
                       <div className="absolute top-0 inset-x-0 h-1 bg-white/40 rounded-t-xl" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

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
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/30 blur-3xl rounded-full -z-10" />
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full -z-10" />
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
