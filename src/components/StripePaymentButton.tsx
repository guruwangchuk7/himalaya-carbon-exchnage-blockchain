"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./Button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // If toast is not available, I'll use simple alert or console

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  // We'll throw at runtime if it's not defined
}

const getStripe = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    console.warn("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Stripe features will be disabled.");
    return null;
  }
  return loadStripe(key);
};

const stripePromise = getStripe();

interface StripePaymentProps {
  amount: number; // in cents
  planName: string;
  userId?: string;
  userEmail?: string;
}

export const StripePaymentButton = ({ amount, planName, userId, userEmail }: StripePaymentProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, planName, userId, userEmail }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Safe redirect to Stripe-hosted Checkout Page
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Checkout redirection failed:", error.message);
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      variant={planName === "Institutional Traders" ? "primary" : "secondary"}
      className="mt-6 w-full flex items-center justify-center gap-2 border border-border-subtle"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Access ${planName} Portals`
      )}
    </Button>
  );
};
