"use client";

import { Navbar } from "@/components/Navbar";
import { Shield, BarChart3, Database, CheckCircle2, Zap, RefreshCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { getUserBalances, getUserProfile } from "@/lib/actions/market";
import { StatCard, PortfolioItem } from "@/components/dashboard/DashboardWidgets";
import { useRouter } from "next/navigation";
import { RFQStatusPanel } from "@/components/RFQStatusPanel";
import { Team } from "@/components/Team";

export default function BuyerDashboardPage() {
  const router = useRouter();
  const [balances, setBalances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const bypass = params.get("bypass") || undefined;

    const [balRes, profRes] = await Promise.all([
      getUserBalances(),
      getUserProfile(bypass as any)
    ]);

    if (profRes.success && profRes.data) {
      const allowedBuyerRoles = ["BUYER", "TRADER", "OPERATOR", "AUDITOR"];
      if (!allowedBuyerRoles.includes(profRes.data.role)) {
        console.error("Role mismatch! Expected a Buyer-compatible role, got:", profRes.data.role);
        router.push("/access");
        return;
      }
      setProfile(profRes.data);
    } else {
       console.error("Profile fetch failed:", profRes.error);
       router.push("/access");
       return;
    }

    if (balRes.success && balRes.data) {
      setBalances(balRes.data);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="section-h2 text-foreground mb-4">
            Institutional Buyer Dashboard
          </h1>
          <p className="body-primary max-w-2xl text-muted-text">
            Monitor institutional portfolio acquisitions, Article 6 compliance, and interact with the sovereign marketplace.
          </p>
          <div className="mt-6 flex items-center gap-3 px-5 py-3 rounded-2xl bg-accent text-white border border-brand/20 max-w-2xl shadow-lg shadow-brand/5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <p className="text-xs font-bold tracking-wide">
              Institutional Traders: Please construct SIWE payload via web3 wallet on the dashboard.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Holdings" value={`${balances.reduce((acc, b) => acc + b.amount, 0).toLocaleString()} HCR`} icon={Database} trend="+4%" />
          <StatCard label="My Holdings" value={`${balances.length} Assets`} icon={Shield} />
          <StatCard label="Registry Sync" value="Healthy" icon={CheckCircle2} />
          <StatCard label="Active Vintages" value="2024" icon={BarChart3} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
             <section className="bg-surface border border-border-subtle rounded-[48px] p-10 shadow-soft-float relative overflow-hidden group">
                 <h2 className="card-h3 mb-8 flex items-center gap-3">
                   <RefreshCcw className="text-brand" size={24} /> My Marketplace Activity
                 </h2>
                 <p className="text-muted-text text-sm mb-6 leading-relaxed font-medium">
                   Discover and acquire Article 6.2 authorized carbon credits directly from the national registry.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                       href="/marketplace"
                       className="w-full border-0 shadow-lg shadow-brand/10 flex items-center justify-center gap-3 py-5 rounded-2xl hover:scale-[1.02] transition-transform"
                    >
                       Go to Carbon Marketplace <Zap size={18} />
                    </Button>
                    <Button 
                       href="/retire"
                       variant="secondary"
                       className="w-full border border-brand/20 flex items-center justify-center gap-3 py-5 rounded-2xl hover:scale-[1.02] transition-transform"
                    >
                       Retire Credits
                    </Button>
                 </div>
             </section>

             <RFQStatusPanel />
          </div>

          <div className="space-y-8">
            <section className="bg-accent text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/30 blur-[100px] rounded-full -z-10" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Database className="text-brand" size={24} /> My Asset Portfolio
                </h2>
                {balances.length === 0 ? (
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/5 text-center">
                     <p className="text-xs text-gray-400 mb-4">You don't own any carbon credits yet.</p>
                     <Button href="/marketplace" variant="secondary" className="w-full text-xs">Buy from Marketplace</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {balances.map((b) => (
                      <PortfolioItem key={b.id} balance={b} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
      <Team />
    </main>
  );
}
