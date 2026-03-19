import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      throw new Error("Stripe secret key is missing on the server.");
    }

    const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
    }

    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle different event types
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Find the payment record and mark it SUCCEEDED
        await (prisma as any).payment.update({
          where: { stripeSessionId: session.id },
          data: {
            status: "SUCCEEDED",
            stripePaymentIntentId: session.payment_intent as string,
            customerEmail: session.customer_details?.email,
          },
        });

        // Add additional logic here (e.g., Update user profile/role)
        const userId = session.metadata?.userId;
        const planName = session.metadata?.planName;

        if (userId && userId !== "guest") {
          // You can update the user profile or role based on the payment
          // Example:
          // await prisma.profile.update({
          //   where: { userId },
          //   data: { isAuthorized: true, role: Role.TRADER },
          // });
        }
        
        console.log(`Payment SUCCEEDED for session ${session.id}`);
        break;
      }

      case "checkout.session.expired":
      case "payment_intent.payment_failed": {
        const sessionOrIntent = event.data.object as Stripe.Checkout.Session | Stripe.PaymentIntent;
        const sessionId = "id" in sessionOrIntent ? (sessionOrIntent as any).id : null;
        
        if (sessionId) {
          await (prisma as any).payment.update({
            where: { stripeSessionId: sessionId },
            data: { status: "FAILED" },
          });
        }
        console.log(`Payment FAILED for session ${sessionId}`);
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await (prisma as any).payment.update({
          where: { stripeSessionId: session.id },
          data: { status: "FAILED" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
    } catch (error: any) {
      console.error("Webhook processing error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (outerError: any) {
    console.error("Critical Webhook Error:", outerError.message);
    return NextResponse.json({ error: outerError.message }, { status: 500 });
  }
}

// Ensure it's not cached
export const dynamic = "force-dynamic";
