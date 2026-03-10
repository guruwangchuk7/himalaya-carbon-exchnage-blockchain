"use client";

import { Button } from "./Button";
import Image from "next/image";

export const Footer = () => (
  <footer className="py-24 bg-accent text-background">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <section className="md:col-span-1" aria-label="Brand">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-brand overflow-hidden" />
            <span className="font-bold text-xl tracking-tight text-white">Himalaya Carbon</span>
          </div>
          <p className="text-gray-400 max-w-60">
            Sovereign market infrastructure for Bhutan&apos;s carbon registry, exchange workflows, and cross-border participation.
          </p>
        </section>
        
        <section aria-label="Platform links">
          <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Platform</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="/dashboard" className="hover:text-white transition-colors">Registry dashboard</a></li>
            <li><a href="/marketplace" className="hover:text-white transition-colors">Project marketplace</a></li>
            <li><a href="#templates" className="hover:text-white transition-colors">Infrastructure</a></li>
            <li><a href="#subscribe" className="hover:text-white transition-colors">Sovereign policy</a></li>
          </ul>
        </section>
        
        <section aria-label="Resource links">
          <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Resources</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="/docs/prd.pdf" target="_blank" className="hover:text-white transition-colors">PRD brief</a></li>
            <li><a href="/docs/resportcarbon.pdf" target="_blank" className="hover:text-white transition-colors">Carbon report</a></li>
            <li><a href="/docs/techstack.pdf" target="_blank" className="hover:text-white transition-colors">Tech stack</a></li>
            <li><a href="/docs/todo.md" className="hover:text-white transition-colors">Implementation status</a></li>
          </ul>
        </section>
        
        <section id="subscribe" aria-label="Subscribe">
          <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Updates</h4>
          <p className="text-gray-400 mb-6">Request updates on sandbox cohorts, registry integrations, and market launch milestones.</p>
          <form
            className="flex bg-white/10 rounded-full p-1 border border-white/20"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const emailInput = form.elements.namedItem('email') as HTMLInputElement;
              alert("Waitlist registration submitted for: " + emailInput.value);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
               id="newsletter-email"
               type="email"
               name="email"
               required
               placeholder="Work email"
               className="bg-transparent border-none outline-none px-4 flex-1 text-sm text-white placeholder:text-gray-500 focus:ring-0"
            />
            <Button type="submit" className="px-5 py-2 text-xs bg-white text-black">
              Join
            </Button>
          </form>
        </section>
      </div>
      
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
        <p>(c) 2026 Himalaya Carbon Exchange. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white" onClick={(e) => { e.preventDefault(); alert("Privacy Policy coming soon."); }}>Privacy Policy</a>
          <a href="#" className="hover:text-white" onClick={(e) => { e.preventDefault(); alert("Terms of Service coming soon."); }}>Terms of Service</a>
          <a href="#" className="hover:text-white" onClick={(e) => { e.preventDefault(); alert("Security documentation is available in the Tech Stack PDF."); }}>Security</a>
        </div>
      </div>
    </div>
  </footer>
);
