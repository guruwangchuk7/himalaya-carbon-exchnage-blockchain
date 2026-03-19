import Stripe from "stripe";

const getStripeServer = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not defined in environment variables.");
    return null;
  }
  return new Stripe(secretKey, {
    apiVersion: "2026-02-25.clover" as any,
    typescript: true,
  });
};

export const stripe = getStripeServer();
