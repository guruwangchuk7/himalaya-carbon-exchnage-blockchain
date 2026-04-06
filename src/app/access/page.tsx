"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldAlert, Users, ArrowRight, Building2, Globe, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col pt-32">
      <Navbar />
      
      <div className="container mx-auto px-6 flex-1 flex flex-col justify-center max-w-6xl pb-24">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-6 backdrop-blur-sm">
            <Lock className="w-1.5 h-1.5 text-brand" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">Sovereign Access Control</span>
          </div>
          <h1 className="display-h1 text-foreground mb-6">Select your access portal</h1>
          <p className="body-primary max-w-2xl mx-auto text-muted-text">
            Choose your role on the Himalaya Carbon platform. Each portal is cryptographically secured to ensure integrity of sovereign carbon units.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Buyer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float overflow-hidden hover:border-brand/40 transition-all duration-500"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-brand/5 to-transparent blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-brand-soft rounded-3xl flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">Carbon Market Buyer</h2>
              <p className="text-muted-text mb-8 leading-relaxed">
                Experience Bhutan's premium carbon units. Browse the marketplace, acquire authorized credits, and legally retire them for net-zero goals.
              </p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Access Primary Marketplace",
                  "View Transparency Logs",
                  "Retire Sovereign Credits",
                  "Download Legal Certificates"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-accent/80">
                    <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button 
                href="/login?role=buyer&signup=true"
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 group/btn shadow-lg hover:shadow-brand/20"
              >
                Join as Buyer <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Government Admin Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-accent border border-white/5 rounded-[48px] p-10 shadow-2xl overflow-hidden hover:border-brand/40 transition-all duration-500"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-brand/20 to-transparent blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col h-full text-white">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform border border-white/5">
                <ShieldAlert size={32} />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Government Admin</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Exclusive portal for National Carbon Registry officials. Manage sovereign issuance, authorize Article 6.2 bilateral transfers, and monitor platform health.
              </p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Issue National Carbon Units",
                  "Manage Project Life Cycle",
                  "Authorize Article 6.2 Transfers",
                  "Sync with Global CAD Trust"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-brand" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button 
                href="/login?role=admin"
                variant="secondary"
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 bg-white text-accent hover:bg-brand hover:text-white border-0 shadow-lg group/btn hover:shadow-brand/20"
              >
                Admin Secure Login <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Support Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-xs text-muted-text">
            Need institutional verification for your organization? <Link href="/eligibility" className="text-brand font-bold hover:underline">View Eligibility Guide</Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
