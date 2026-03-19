"use client";

import { Wallet, CreditCard, ShieldCheck, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { cn } from "@/app/utils";

import { toast } from "sonner";

/**
 * Combined Wallet & Payment Dropdown
 * Unified interface for institutional card payments (Stripe) 
 * and Web3 identity/transactions (Crypto Wallets).
 */
export const WalletDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStripeCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct integration with the Stripe API route we created
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: 50000, // $500.00 default for institutional hub
          planName: "Institutional Access",
        }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);
      
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error: any) {
      console.error("Stripe Checkout Error:", error);
      toast.error(`Checkout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Unified Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2.5 rounded-full transition-all border flex items-center justify-center relative z-20 shadow-sm",
          isOpen 
            ? "bg-brand text-white border-brand shadow-lg" 
            : "bg-surface text-foreground/70 hover:text-foreground border-border-subtle hover:bg-black/5"
        )}
        title="Wallet & Payments"
      >
        <Wallet size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 origin-top-right rounded-[28px] bg-white p-2 shadow-2xl border border-border-subtle z-50 overflow-hidden"
          >
            <div className="px-5 py-4 mb-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-[24px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Institutional Hub</p>
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            </div>

            <div className="space-y-1">
              {/* Stripe Payment Option */}
              <button 
                onClick={handleStripeCheckout}
                disabled={loading}
                className={cn(
                  "group flex items-center justify-between w-full p-3.5 rounded-2xl hover:bg-gray-50 transition-all text-left",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CreditCard size={20} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Stripe Checkout</p>
                    <p className="text-[10px] text-tertiary-text">Card, Apple Pay, Google Pay</p>
                  </div>
                </div>
                {!loading && <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-0.5 transition-transform" />}
              </button>

              {/* RainbowKit (Crypto) Integration */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                  return (
                    <div
                      style={{
                        opacity: ready ? 1 : 0,
                        pointerEvents: ready ? "auto" : "none",
                        userSelect: ready ? "auto" : "none",
                      }}
                    >
                      {!connected ? (
                        <button
                          onClick={() => {
                            openConnectModal();
                            setIsOpen(false);
                          }}
                          className="group flex items-center justify-between w-full p-3.5 rounded-2xl hover:bg-gray-50 transition-all text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center text-brand transition-transform group-hover:scale-105">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">Crypto Wallet</p>
                              <p className="text-[10px] text-tertiary-text">Connect Web3 identity</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ) : (
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              openAccountModal();
                              setIsOpen(false);
                            }}
                            className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-brand/5 border border-brand/20 hover:bg-brand/10 transition-all text-left"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-white shadow-md">
                                <ShieldCheck size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground truncate max-w-[120px]">
                                  {account.displayName}
                                </p>
                                <p className="text-[10px] text-brand font-semibold tracking-tight">Active Connection</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                               <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                               {chain.hasIcon && (
                                 <div className="w-3 h-3 rounded-full overflow-hidden border border-white">
                                    {chain.iconUrl && <img alt={chain.name} src={chain.iconUrl} className="w-full h-full" />}
                                 </div>
                               )}
                            </div>
                          </button>
                           {chain && (
                             <button 
                               onClick={openChainModal}
                               className="w-full px-4 py-2 text-[10px] font-bold text-center text-gray-400 hover:text-brand transition-colors uppercase tracking-widest"
                             >
                               Network: {chain.name}
                             </button>
                           )}
                        </div>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
            
            <div className="mt-2 p-3 bg-gray-50 rounded-b-[24px] text-center">
               <p className="text-[9px] text-gray-400 leading-tight">Secure endpoints managed by Himalaya Carbon Exchange Infrastructure</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
