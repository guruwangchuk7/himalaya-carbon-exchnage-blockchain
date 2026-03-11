"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { motion } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-medium hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 rounded-md"
  >
    {children}
  </Link>
);

import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <nav aria-label="Primary" className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6">
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-3 shadow-soft-float"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Himalaya Carbon"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Himalaya Carbon
          </span>
        </Link>
        
        <ul className="hidden md:flex items-center gap-8" role="list">
          <li><NavLink href="/marketplace">Marketplace</NavLink></li>
          <li><NavLink href="/transparency">Transparency</NavLink></li>
          <li><NavLink href="/dashboard">Dashboard</NavLink></li>
          <li><NavLink href="/retire">Retire Credits</NavLink></li>
        </ul>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
          </div>
          <Button
            href="/dashboard"
            className="px-5 py-2 text-sm"
            aria-label="Access registry dashboard"
          >
            Access registry
          </Button>
        </div>
      </motion.div>
    </nav>
  );
};
