"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Globe, FileText, CheckCircle2, ChevronRight, BarChart3, Database } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const { id } = useParams();

  // Mock project data based on ID
  const project = {
    id: id,
    name: id === "BHU-RE-2023-001" ? "Wangdue Hydropower Offset" : "Phobjikha Conservation Project",
    vintage: 2023,
    methodology: "Renewable Energy (ACM0002)",
    authorized: true,
    available: "15,420 tCO2e",
    price: "$18.50",
    summary: "This project generates clean energy using the mountain streams of Wangdue Phodrang. It currently provides carbon offsets through power export, contributing to Bhutan's climate roadmap as a carbon-negative nation.",
    cadTrustData: {
      projectId: "BHU-P-022",
      registry: "National Carbon Registry (BT)",
      vintage: "2023",
      methodology: "Renewable Energy",
      serialNumbers: "HCR-BT-2023-001-000001 to HCR-BT-2023-001-250000",
      status: "Authorized for Article 6.2 ITMO Transfer",
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/marketplace" 
          className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-brand transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-brand-soft text-brand font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest">{project.vintage} Vintage</span>
              {project.authorized && (
                <span className="flex items-center gap-1 bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  <Shield size={12} /> Article 6.2 Certified
                </span>
              )}
            </div>
            
            <h1 className="section-h2 text-foreground mb-8 leading-tight">
              {project.name}
            </h1>
            
            <p className="body-primary mb-10 leading-relaxed max-w-xl">
              {project.summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
               <Button className="px-10 py-5 text-base flex justify-center items-center gap-2">
                  Acquire {project.price}/t <ChevronRight size={18} />
               </Button>
               <Button variant="secondary" className="px-10 py-5 text-base flex justify-center items-center gap-2 border-border-subtle bg-white hover:bg-gray-50">
                  <FileText size={18} /> Download PDD
               </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-border-subtle">
               <div>
                  <p className="label-meta text-[11px] mb-1">Methodology</p>
                  <p className="font-bold text-lg">{project.methodology}</p>
               </div>
               <div>
                  <p className="label-meta text-[11px] mb-1">Available for Transfer</p>
                  <p className="font-bold text-lg">{project.available}</p>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-ratio-4/3 bg-gray-100 rounded-[40px] overflow-hidden shadow-soft-float border-8 border-white/50 relative">
               <div className="absolute inset-0 bg-brand/5 backdrop-blur-sm flex items-center justify-center">
                  <p className="text-gray-400 font-medium">Project Gallery</p>
               </div>
            </div>
            {/* Quick stats floating card */}
            <motion.div 
               initial={{ x: 30, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="absolute -bottom-10 -left-10 bg-white border border-border-subtle p-8 rounded-3xl shadow-hover-lift max-w-xs"
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-soft flex items-center justify-center rounded-2xl text-brand">
                     <BarChart3 size={20} />
                  </div>
                  <h4 className="font-bold">Real-time Impact</h4>
               </div>
               <p className="text-sm text-muted-text mb-4">
                  Contributing to -0.4M tons of annual emission reduction for the Wangdue region.
               </p>
               <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="w-4/5 bg-brand h-full rounded-full" />
               </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Data Tabs */}
        <section className="bg-surface border border-border-subtle rounded-[32px] p-10 shadow-soft-float mb-20 overflow-hidden">
           <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border-subtle">
              <Database size={24} className="text-brand" />
              <h2 className="card-h3 m-0">CAD Trust Technical Metadata</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-8">
                 <div>
                    <p className="label-meta text-[11px] mb-2 font-bold uppercase tracking-wider text-tertiary-text">Registry Details</p>
                    <div className="flex flex-col gap-4">
                       <div className="flex justify-between items-center py-3 border-b border-border-subtle/50">
                          <span className="text-sm text-muted-text">National Project ID</span>
                          <span className="text-sm font-bold">{project.cadTrustData.projectId}</span>
                       </div>
                       <div className="flex justify-between items-center py-3 border-b border-border-subtle/50">
                          <span className="text-sm text-muted-text">Issuing Registry</span>
                          <span className="text-sm font-bold">{project.cadTrustData.registry}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <p className="label-meta text-[11px] mb-2 font-bold uppercase tracking-wider text-tertiary-text">Verification Data</p>
                    <div className="flex flex-col gap-4">
                       <div className="flex justify-between items-center py-3 border-b border-border-subtle/50">
                          <span className="text-sm text-muted-text">Vintage Year</span>
                          <span className="text-sm font-bold">{project.cadTrustData.vintage}</span>
                       </div>
                       <div className="flex justify-between items-center py-3 border-b border-border-subtle/50">
                          <span className="text-sm text-muted-text">VVB Auditor</span>
                          <span className="text-sm font-bold">Standard Bhutan Verification</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-brand-soft/50 p-6 rounded-2xl border border-brand/10">
                    <p className="label-meta text-[11px] mb-4 font-bold uppercase tracking-wider text-tertiary-text">Integrity Layer</p>
                    <div className="flex items-start gap-3 mb-4">
                       <Shield size={20} className="text-brand mt-0.5" />
                       <p className="text-sm font-bold leading-relaxed">
                          Sovereign-grade data integrity. All units map 1:1 to the National Registry.
                       </p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-text">
                          <span>Article 6 Alignment</span>
                          <span className="text-success">Level 4 (Full Audit)</span>
                       </div>
                       <div className="w-full bg-white rounded-full h-1">
                          <div className="w-full bg-success h-full rounded-full" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-accent text-white p-6 rounded-2xl border border-white/5 shadow-soft-float">
                    <p className="label-meta text-[10px] mb-4 font-bold uppercase tracking-wider text-gray-400">Sovereign Validation</p>
                    <div className="flex items-start gap-4">
                       <CheckCircle2 size={24} className="text-brand flex-shrink-0" />
                       <div>
                          <p className="text-xs font-bold mb-1">Authenticated by Ministry of Energy</p>
                          <p className="text-[10px] text-gray-400 leading-normal">
                            This project is a recognized component of Bhutan's National Climate Strategy.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-12 p-8 bg-background border border-border-subtle rounded-2xl">
              <p className="label-meta text-[11px] mb-4 font-bold uppercase tracking-wider text-tertiary-text">Serial Range</p>
              <code className="text-xs bg-white px-4 py-3 border border-border-subtle rounded-lg block font-mono text-foreground break-all whitespace-normal">
                 {project.cadTrustData.serialNumbers}
              </code>
           </div>
        </section>

        {/* Call to action */}
        <div className="text-center py-20 bg-accent text-white rounded-[40px]">
           <h2 className="section-h2 mb-4">Ready to start trading?</h2>
           <p className="text-gray-300 mb-10 max-w-xl mx-auto">
              Open a sovereign registry account to interact with Article 6.2 authorized units.
           </p>
           <div className="flex justify-center gap-6">
              <Button className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 px-10">
                 Open Account <ChevronRight size={18} />
              </Button>
           </div>
        </div>
      </div>
    </main>
  );
}
