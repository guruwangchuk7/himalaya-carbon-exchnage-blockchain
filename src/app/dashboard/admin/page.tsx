"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, UserCheck, UserPlus, Users, CheckCircle2, XCircle, RefreshCcw, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { updateParticipantAuthorization } from "@/app/actions/sovereign";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newParticipant, setNewParticipant] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchParticipants = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/registry/participants");
      const data = await res.json();
      setParticipants(data);
    } catch (e) {
      console.error("Failed to fetch participants");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleUpdateStatus = async (address: string, status: boolean) => {
    setIsUpdating(true);
    try {
      // Execute the Secure Server Action (Bypasses API/HMAC requirement)
      const data = await updateParticipantAuthorization(address, status);

      if (data.success && data.hash) {
        alert(`Sovereign Authorization Submitted: ${data.hash}`);
        // Refresh after a delay to allow for tx processing
        setTimeout(fetchParticipants, 5000);
      } else {
        alert(`Failed to update status: ${data.error}`);
      }
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddParticipant = () => {
    if (!newParticipant) return;
    handleUpdateStatus(newParticipant, true);
    setNewParticipant("");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-3xl">
             <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand/20">Registry Control Center</span>
                <span className="flex items-center gap-2 text-success text-xs font-bold">
                    <Shield size={14} /> Restricted Access
                </span>
             </div>
             <h1 className="display-h1 mb-4">Institutional Whitelist</h1>
             <p className="body-primary text-muted-text">
               Manage authorized participants for the Himalaya Carbon Registry. Only whitelisted institutions can receive, trade, or transfer Article 6 carbon credits.
             </p>
          </div>
          <Button variant="secondary" onClick={fetchParticipants} className="flex gap-2 items-center">
             <RefreshCcw size={18} /> Sync Registry State
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Left Column: Management Layer */}
           <div className="lg:col-span-2">
              <div className="bg-surface border border-border-subtle rounded-[40px] shadow-soft-float overflow-hidden">
                 <div className="p-8 border-b border-border-subtle flex justify-between items-center bg-secondary-bg/10">
                    <h3 className="card-h3 m-0 flex items-center gap-3">
                       <Users className="text-brand" size={24} /> Authorized Legal Entities
                    </h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-text" size={16} />
                       <input 
                         type="text" 
                         placeholder="Filter participants..." 
                         className="pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand/20"
                       />
                    </div>
                 </div>

                 <div className="divide-y divide-border-subtle">
                   {isLoading ? (
                     <div className="p-20 text-center text-muted-text">Loading registry data...</div>
                   ) : participants.length === 0 ? (
                     <div className="p-20 text-center text-muted-text">No participants found in registry.</div>
                   ) : (
                     participants.map((p) => (
                       <div key={p.address} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-secondary-bg/5 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-2xl ${p.authorized ? 'bg-success/10 text-success' : 'bg-brand/10 text-brand'}`}>
                                <UserCheck size={24} />
                             </div>
                             <div>
                                <p className="font-bold text-accent">{p.name || "Unknown Entity"}</p>
                                <p className="text-[10px] font-mono text-tertiary-text">{p.address}</p>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                             <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${p.authorized ? 'bg-success/10 text-success border-success/20' : 'bg-brand/10 text-brand border-brand/20'}`}>
                                {p.authorized ? 'Authorized' : 'Unauthorized'}
                             </span>
                             <Button 
                                variant="secondary" 
                                className="px-4 py-2 text-xs"
                                onClick={() => handleUpdateStatus(p.address, !p.authorized)}
                                disabled={isUpdating}
                             >
                                {p.authorized ? 'Revoke' : 'Authorize'}
                             </Button>
                          </div>
                       </div>
                     ))
                   )}
                 </div>
              </div>
           </div>

           {/* Right Column: Invite/Add Layer */}
           <div className="space-y-8">
              <section className="bg-accent text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-center bg-cover" />
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <UserPlus size={28} className="text-brand" /> Add Participant
                 </h2>
                 <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                   Enter the institutional wallet address to grant registry access and Article 6 authorization.
                 </p>
                 
                 <div className="space-y-6 relative z-10">
                    <div>
                       <label className="label-meta text-[10px] uppercase text-gray-400 block mb-2">Institutional Wallet Address</label>
                       <input 
                         type="text" 
                         value={newParticipant}
                         onChange={(e) => setNewParticipant(e.target.value)}
                         placeholder="0x..." 
                         className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand/40"
                       />
                    </div>
                    <Button 
                      className="w-full py-5 flex items-center justify-center gap-2 bg-brand"
                      onClick={handleAddParticipant}
                      disabled={isUpdating || !newParticipant}
                    >
                       Grant On-chain Authorization <CheckCircle2 size={18} />
                    </Button>
                 </div>
              </section>

              <section className="bg-surface border border-border-subtle p-8 rounded-[32px]">
                 <h3 className="card-h3 mb-6 flex items-center gap-3">
                    <BarChart3 className="text-brand" size={24} /> Compliance Stats
                 </h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs py-3 border-b border-border-subtle">
                       <span className="text-muted-text">Sovereign Entities</span>
                       <span className="font-bold">2</span>
                    </div>
                    <div className="flex justify-between text-xs py-3 border-b border-border-subtle">
                       <span className="text-muted-text">Licensed Brokers</span>
                       <span className="font-bold">14</span>
                    </div>
                    <div className="flex justify-between text-xs py-3">
                       <span className="text-muted-text">Cross-border Authorities</span>
                       <span className="font-bold flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-success" /> 3 Countries
                       </span>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
