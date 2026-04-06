"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    { title: "1. Data Collection", content: "We collect institutional data necessary for registry participation, including organization names, verified emails, and KYC documentation. No public personal data is stored without explicit authorization." },
    { title: "2. Sovereignty First", content: "All data is stored on sovereign-controlled infrastructure within the Kingdom of Bhutan. We prioritize national data sovereignty in alignment with regional cybersecurity protocols." },
    { title: "3. Blockchain Records", content: "Transaction data (issuance and retirement) is permanent and immutable on the public ledger. Wallet addresses are pseudo-anonymous but linked to verified institutional profiles internally." },
    { title: "4. Third-Party Sharing", content: "Data is only shared with authorized international bodies (such as the CAD Trust) for mandatory Article 6 compliance and double-counting prevention." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="bg-surface border border-border-subtle rounded-[56px] p-8 md:p-16 shadow-soft-float relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl -mr-20 -mt-20 rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 text-brand">
               <ShieldCheck size={40} />
               <div>
                  <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Last Updated: April 2026</p>
               </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-12">
               {sections.map((section, i) => (
                 <section key={i}>
                    <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border-subtle pb-4">{section.title}</h2>
                    <p className="text-muted-text leading-relaxed text-sm opacity-80">{section.content}</p>
                 </section>
               ))}
               
               <section className="bg-background/50 border border-border-subtle p-8 rounded-3xl mt-12 text-center">
                  <p className="text-xs text-muted-text mb-4">Have questions about your institutional data?</p>
                  <a href="mailto:privacy@himalayacarbon.bt" className="text-brand font-bold hover:underline">privacy@himalayacarbon.bt</a>
               </section>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
