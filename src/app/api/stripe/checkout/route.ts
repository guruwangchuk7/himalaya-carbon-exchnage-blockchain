import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      throw new Error("Stripe is not initialized. Please check your STRIPE_SECRET_KEY.");
    }
    
    const { amount, planName, userId, userEmail } = await req.json();

    if (!amount || !planName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Himalaya Carbon - ${planName} Access`,
              description: `Access to the ${planName} stage on the Himalaya Carbon platform.`,
            },
            unit_amount: amount, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment_cancelled=true`,
      customer_email: userEmail || undefined,
      metadata: {
        userId: userId || "guest",
        planName,
      },
    });

    // We store the session in our database as PENDING
    await (prisma as any).payment.create({
      data: {
        userId: userId || null,
        amount,
        currency: "usd",
        status: "PENDING",
        stripeSessionId: session.id,
        customerEmail: userEmail || null,
        metadata: {
          planName,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
