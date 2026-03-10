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
      <LogoTicker />
      <Features />
      <BentoGrid />
      <Pricing />
      <Footer />
    </main>
  );
}
