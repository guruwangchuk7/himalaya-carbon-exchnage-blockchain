import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { BentoGrid } from "@/components/BentoGrid";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative selection:bg-brand/20">
      <Navbar />
      <Hero />
      
      {/* Strategic Clarity Banner */}
      <section className="bg-accent py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        {/* Decorative ambient light */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-brand/10 to-transparent blur-3xl rounded-full translate-x-1/2 -z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 border-b border-white/10 pb-16 mb-16">
            <div className="max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Institutional Engine</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                 Registry-synchronized <br className="hidden md:block" />
                 market layer
               </h2>
               <p className="text-gray-300 text-xl leading-relaxed font-light">
                 Himalaya Carbon Engine provides cryptographic proof of impact. Our platform enables institutional carbon pools and retirement of official carbon units issued by the <strong className="text-white font-medium">National Carbon Registry of Bhutan</strong>.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
               <div className="group bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-md shadow-soft-float transition-all hover:bg-white/10">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-3 opacity-80">Source of Truth</p>
                  <p className="text-white text-2xl font-bold tracking-tight">Bhutan National Registry</p>
                  <div className="mt-4 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full rounded-full" />
               </div>
               <div className="group bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-md shadow-soft-float transition-all hover:bg-white/10">
                  <p className="text-[10px] font-bold text-success uppercase tracking-[0.2em] mb-3 opacity-80">Authorization</p>
                  <p className="text-white text-2xl font-bold tracking-tight">Article 6.2 ITMO</p>
                  <div className="mt-4 h-1 w-0 bg-success transition-all duration-500 group-hover:w-full rounded-full" />
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               {
                 title: "Secure Minting Relayer",
                 desc: "Real-time on-chain token issuance triggered directly by sovereign operators."
               },
               {
                 title: "Provable Impact",
                 desc: "Retirement automatically verifies receipts and generates uniquely hash-linked certificates."
               },
               {
                 title: "DEX Liquidity",
                 desc: "Supports fractional trading of individual ERC-1155 vintages via ERC-20 Carbon Pools."
               }
             ].map((item, index) => (
               <ScrollReveal key={index} delay={0.1 * (index + 1)} distance={30}>
                 <div className="group relative flex gap-6 p-2 rounded-2xl transition-all hover:translate-x-1">
                    <div className="relative flex-none">
                      <div className="w-3 h-3 rounded-full bg-brand mt-2.5 ring-4 ring-brand/20 shadow-[0_0_15px_rgba(var(--brand-rgb),0.5)] transition-transform group-hover:scale-125" />
                      {index < 2 && <div className="absolute top-8 left-1.5 w-px h-12 bg-linear-to-b from-brand/30 to-transparent hidden md:block" />}
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed font-light">
                      <strong className="text-white font-semibold block mb-1 text-xl tracking-tight">{item.title}</strong>
                      <span className="opacity-80">{item.desc}</span>
                    </p>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      <LogoTicker />
      
      <Features />

      <BentoGrid />

      <Pricing />
      
      <Footer />
    </main>
  );
}


