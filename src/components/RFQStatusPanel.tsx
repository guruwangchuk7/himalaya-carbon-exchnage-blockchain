"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getUserRFQs } from "@/lib/actions/market";

export function RFQStatusPanel() {
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await getUserRFQs();
      if (result.success && result.data) {
        setRfqs(result.data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-muted-text">Fetching quote stream...</div>;

  if (rfqs.length === 0) return null;

  return (
    <section className="bg-surface border border-border-subtle rounded-[40px] p-10 shadow-soft-float relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="card-h3 m-0 flex items-center gap-3">
          <MessageSquare className="text-brand" size={24} /> Active Quote Requests (RFQ)
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-4 py-1.5 rounded-full border border-brand/20">
          Institutional Trading Engine
        </span>
      </div>

      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="group p-6 bg-background border border-border-subtle rounded-[32px] hover:border-brand/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-tertiary-text uppercase tracking-widest block mb-1">
                  Reference: #{rfq.id.slice(0, 8)}
                </span>
                <h4 className="text-lg font-bold text-accent">{rfq.project?.projectName || "Sovereign Asset"}</h4>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
                rfq.status === 'OPEN' ? 'bg-brand/10 text-brand border-brand/20' : 'bg-success/10 text-success border-success/20'
              }`}>
                {rfq.status}
              </span>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] uppercase text-muted-text mb-1">Requested Volume</p>
                  <p className="font-bold font-mono">{rfq.targetVolume.toLocaleString()} tCO2e</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-text mb-1">Assigned Broker</p>
                  <p className="text-sm font-medium">National Brokerage Desk</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-brand group-hover:translate-x-1 transition-transform">
                Open Portal <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
