"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, User, Building2, Wallet, CheckCircle2, ChevronRight, LogOut, RefreshCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { getUserProfile, upsertUserProfile } from "@/lib/actions/market";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState<"TRADER" | "OPERATOR" | "AUDITOR">("TRADER");
  const [wallet, setWallet] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      
      const res = await getUserProfile();
      if (res.success && res.data) {
        setProfile(res.data);
        setOrgName(res.data.organization || "");
        setRole(res.data.role || "TRADER");
        setWallet(res.data.walletAddress || "");
      }
      setIsLoaded(true);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });
    
    const res = await upsertUserProfile({
      organization: orgName,
      role,
      walletAddress: wallet
    });

    if (res.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setProfile(res.data);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update profile." });
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCcw className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
             <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand/20">Identity Management</span>
             </div>
             <h1 className="display-h1 mb-6">Institutional Profile</h1>
             <p className="body-primary text-muted-text max-w-2xl">
               Manage your professional identity on the Himalaya Carbon Exchange. Your role determines your access to the market and registry functions.
             </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-surface border border-border-subtle p-8 rounded-[40px] shadow-soft-float text-center">
                 <div className="w-24 h-24 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <User size={48} className="text-brand" />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-success border-4 border-white rounded-full" />
                 </div>
                 <h3 className="text-xl font-bold mb-1 truncate px-2">{profile?.organization || "Guest User"}</h3>
                 <p className="text-xs text-muted-text mb-6 font-mono break-all leading-tight">{user?.email || "Not logged in"}</p>
                 
                 <div className="flex flex-col gap-3 text-left">
                    <div className="bg-secondary-bg/50 px-4 py-3 rounded-2xl flex justify-between items-center text-[10px]">
                       <span className="text-muted-text font-medium">Status</span>
                       <span className="text-success font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Verified
                       </span>
                    </div>
                    <div className="bg-secondary-bg/50 px-4 py-3 rounded-2xl flex justify-between items-center text-[10px]">
                       <span className="text-muted-text font-medium">Clearance</span>
                       <span className="text-accent font-bold uppercase">{profile?.role || "GUEST"}</span>
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-6 bg-white border border-border-subtle rounded-3xl text-warning font-bold hover:bg-warning/5 transition-colors group"
              >
                <div className="flex items-center gap-3 text-sm">
                   <LogOut size={20} /> Sign Out
                </div>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border-subtle p-10 rounded-[40px] shadow-soft-float">
                <h3 className="card-h3 mb-8 flex items-center gap-3">
                   <Building2 className="text-brand" size={24} /> Organization Details
                </h3>

                <div className="space-y-8">
                  <div>
                    <label className="label-meta text-xs block mb-3 uppercase font-bold tracking-wider">Organization Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Druk Green Power Corporation"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-6 py-4 bg-background border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all font-bold"
                    />
                    <p className="mt-2 text-[10px] text-tertiary-text leading-tight">This name will appear on all legal retirement certificates issued to you.</p>
                  </div>

                  <div>
                    <label className="label-meta text-xs block mb-3 uppercase font-bold tracking-wider">Account Role</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "TRADER", label: "Buyer", desc: "For buying and retiring credits." },
                        { id: "OPERATOR", label: "Seller", desc: "For project developers." },
                        { id: "AUDITOR", label: "Auditor", desc: "Read-only transparency access." }
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setRole(r.id as any)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            role === r.id 
                              ? "border-brand bg-brand-soft ring-2 ring-brand/10" 
                              : "border-border-subtle hover:border-brand/40"
                          }`}
                        >
                          <p className={`font-bold text-[10px] mb-1 leading-tight ${role === r.id ? "text-brand" : "text-accent"}`}>{r.label}</p>
                          <p className="text-[9px] text-muted-text leading-tight">{r.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label-meta text-xs block mb-3 uppercase font-bold tracking-wider flex justify-between">
                       <span>Settlement Wallet Address</span>
                       <span className="text-brand lowercase font-normal italic">Optional</span>
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-6 top-1/2 -translate-y-1/2 text-tertiary-text" size={20} />
                      <input
                        type="text"
                        placeholder="0x..."
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        className="w-full pl-16 pr-6 py-4 bg-background border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/10 transition-all font-mono text-[10px]"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-tertiary-text leading-tight">Required for automatic Harmony L1 / Polygon settlement synchronization.</p>
                  </div>

                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl text-[10px] font-bold ${
                        message.type === "success" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}

                  <Button
                    onClick={handleSave}
                    disabled={isSaving || !orgName}
                    className="w-full py-5 text-base flex items-center justify-center gap-3 shadow-soft-float"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCcw className="animate-spin" size={20} /> Saving Changes...
                      </>
                    ) : (
                      <>Update Identity Profile <Shield size={18} /></>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
