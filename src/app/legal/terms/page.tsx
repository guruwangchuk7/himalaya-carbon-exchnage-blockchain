"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const sections = [
    { title: "1. Institutional Enrollment", content: "Access is strictly limited to authorized institutional participants and government officials. You must provide accurate organizational details during onboarding." },
    { title: "2. Article 6.2 Compliance", content: "All users agree to strictly follow national carbon market rules, including mandatory corresponding adjustments and sovereign authorization of ITMO transfers." },
    { title: "3. Blockchain Protocol", content: "Issuance and retirement hashes are permanent records on the sovereign registry ledger. Users are responsible for maintaining secure access to their institutional wallets." },
    { title: "4. Registry Misuse", content: "Any attempt to bypass sovereign authorization or double-count credits will result in immediate suspension and notification to national regulatory authorities." }
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
               <Shield size={40} />
               <div>
                  <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">National Registry Access Protocol v1.0</p>
               </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-12">
               {sections.map((section, j) => (
                 <section key={j}>
                    <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border-subtle pb-4">{section.title}</h2>
                    <p className="text-muted-text leading-relaxed text-sm opacity-80">{section.content}</p>
                 </section>
               ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
