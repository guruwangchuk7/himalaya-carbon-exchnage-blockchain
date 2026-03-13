"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/Button";
import { Shield, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      // Sign Up Logic
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { organization }
        }
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data.user) {
        // Initial profile creation is usually handled by a Supabase Trigger, 
        // but for this dev environment we'll handle it via a component or expect the user to refresh.
        alert("Account created! You can now sign in.");
        setIsLogin(true);
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-surface border border-border-subtle rounded-3xl p-8 shadow-soft-float">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand flex items-center justify-center">
              <Shield size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-foreground mb-2">
            {isLogin ? "Sovereign Access" : "Institutional Onboarding"}
          </h1>
          <p className="text-center text-muted-text mb-8 text-sm">
            {isLogin 
              ? "Sign in to manage the National Registry Bridge." 
              : "Register your organization to participate in the Carbon Exchange."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Organization Name</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-secondary-bg border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand"
                  placeholder="Bhutan Green Energy Ltd"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="email">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-text" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary-bg border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand"
                  placeholder="official@registry.gov.bt"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="password">
                Passphrase
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-text" size={18} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary-bg border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 mt-4 bg-brand hover:bg-brand/90 text-white rounded-xl shadow-md"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-6 text-sm text-brand font-medium hover:underline"
          >
            {isLogin ? "Need to register your organization?" : "Already have an account? Sign in"}
          </button>

          <div className="mt-6 pt-6 border-t border-border-subtle text-center">
            <p className="text-xs text-muted-text">
              Institutional Traders: Please construct SIWE payload via web3 wallet on the dashboard.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
