"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Building2, UserCheck, ArrowRight, CheckCircle2, AlertCircle, Mail, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function EligibilityPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col pt-32">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-1.5 h-1.5 text-brand" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">Institutional Verification</span>
          </div>
          <h1 className="display-h1 text-foreground mb-6">Eligibility & Verification Guide</h1>
          <p className="body-primary max-w-3xl mx-auto text-muted-text">
            To ensure the integrity of the Himalaya Carbon market, all institutional participants must undergo a rigorous verification process in compliance with sovereign environmental standards.
          </p>
        </motion.div>

        {/* Verification Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Building2 className="text-brand" size={24} />,
              title: "1. Entity Identification",
              desc: "Register your organization profile and specify your primary role (Buyer, Project Developer, or Auditor)."
            },
            {
              icon: <FileText className="text-brand" size={24} />,
              title: "2. Document Submission",
              desc: "Upload certified business registration documents and authorized signatory identification."
            },
            {
              icon: <UserCheck className="text-brand" size={24} />,
              title: "3. Compliance Audit",
              desc: "Our verification team reviews your submission against Bhutan's National Registry compliance frameworks."
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-surface border border-border-subtle p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-brand-soft rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-text text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Documentation Checklist Header */}
        <div className="bg-accent rounded-[48px] p-8 md:p-16 relative overflow-hidden mb-24 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Required Documentation</h2>
              <p className="text-white/60 text-lg mb-8 font-light">
                Please ensure you have high-resolution digital copies of the following documents ready for upload during the onboarding process.
              </p>
              <div className="space-y-4">
                {[
                  "Certificate of Environmental Compliance",
                  "Trade License / Articles of Incorporation",
                  "Proof of Operational Address",
                  "Board Resolution for Carbon Trading",
                  "Authorized Signatory KYC (Passport/ID)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 size={18} className="text-brand" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Important Note</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Article 6.2 Compliance</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic border-l-2 border-brand pl-6 mb-8">
                  "Only entities with a verified history of environmental responsibility and no active records of environmental violations are eligible to participate in the National Carbon Registry marketplace."
                </p>
                <Link href="/access" className="w-full inline-block">
                  <Button variant="secondary" className="w-full py-4 bg-white text-accent hover:bg-brand hover:text-white border-0">
                    Proceed to Onboarding <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Officer Registration Form */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border-subtle rounded-[48px] p-8 md:p-16 shadow-soft-float relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 blur-3xl -ml-20 -mb-20 rounded-full" />
            
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-brand-soft rounded-3xl flex items-center justify-center text-brand mx-auto mb-6">
                  <Mail size={32} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Official Registration Inquiry</h2>
                <p className="text-muted-text">
                  Government officials and institutional representatives can submit their preliminary registration details below. Our team (at <span className="text-brand font-semibold">guruwangchuk1234@gmail.com</span>) will contact you for further verification.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-text ml-1 opacity-70">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tenzin Dorji"
                      className="w-full bg-background/50 border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand/20 rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-muted-text/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-text ml-1 opacity-70">Official Email</label>
                    <input 
                      type="email" 
                      placeholder="name@government.bt"
                      className="w-full bg-background/50 border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand/20 rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-muted-text/30"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-text ml-1 opacity-70">Department / Organization</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ministry of Energy and Natural Resources"
                    className="w-full bg-background/50 border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand/20 rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-muted-text/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-text ml-1 opacity-70">Registration Details</label>
                  <textarea 
                    rows={4}
                    placeholder="Please specify your intended role and any institutional credentials..."
                    className="w-full bg-background/50 border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand/20 rounded-2xl py-4 px-6 outline-none transition-all resize-none placeholder:text-muted-text/30"
                  />
                </div>

                <Button 
                  className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-brand/20 bg-accent text-white group/send"
                  href="mailto:guruwangchuk1234@gmail.com?subject=Himalaya Carbon Registry - Official Registration Request"
                >
                  Submit Registration Request <Send size={18} className="group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform duration-300" />
                </Button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
