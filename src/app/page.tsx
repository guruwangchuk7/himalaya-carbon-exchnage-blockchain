import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { BentoGrid } from "@/components/BentoGrid";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative selection:bg-brand/20">
      <Navbar />
      <Hero />
      
      {/* Strategic Clarity Banner */}
      <section className="bg-accent py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-12 mb-12">
            <div className="max-w-xl">
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Registry-synchronized market layer</h2>
               <p className="text-gray-400 text-lg leading-relaxed">
                 Himalaya is <strong>not</strong> a carbon registry. Our platform enables trading and retirement of official carbon units issued by the <strong>National Carbon Registry of Bhutan</strong>.
               </p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Source of Truth</p>
                  <p className="text-white font-bold">Bhutan National Registry</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <p className="text-xs font-bold text-success uppercase tracking-widest mb-1">Authorization</p>
                  <p className="text-white font-bold">Article 6.2 ITMO</p>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2" />
                <p className="text-sm text-gray-400"><strong>Immutable Mirror</strong>: Tokens exist only if backed by locked registry units.</p>
             </div>
             <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2" />
                <p className="text-sm text-gray-400"><strong>Provable Impact</strong>: Retirement events are synchronized with CAD Trust metadata.</p>
             </div>
             <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2" />
                <p className="text-sm text-gray-400"><strong>Clean Discovery</strong>: Public price and volume signals for sovereign assets.</p>
             </div>
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
