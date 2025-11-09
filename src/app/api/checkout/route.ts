import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

// ✅ Checkout Route for "La Khalaba Boutique"
export const POST = async (request: Request) => {
  try {
    const { products } = await request.json();

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    console.log("👜 Received products:", products);

    // Fetch existing active products from Stripe
    let activeProducts = await stripe.products.list({ active: true });
    console.log("📦 Active products in Stripe:", activeProducts.data.length);

    const lineItems: { price: string; quantity: number }[] = [];

    for (const item of products) {
      const { name, price, quantity } = item;

      // Check if product already exists in Stripe
      let existingProduct = activeProducts.data.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      // If product doesn't exist, create it
      if (!existingProduct) {
        const newProduct = await stripe.products.create({
          name,
          default_price_data: {
            currency: "usd",
            unit_amount: price, // 💵 price should be in cents (e.g., $10 = 1000)
          },
        });
        existingProduct = newProduct;
        console.log("✨ Created new product in Stripe:", newProduct.name);
      }

      // Push the price & quantity for checkout
      lineItems.push({
        price: existingProduct.default_price as string,
        quantity,
      });
    }

    // ✅ Create checkout session for La Khalaba Boutique
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `https://la-khalaba.vercel.app/success`,
      cancel_url: `https://la-khalaba.vercel.app/`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US", "PK", "AE", "SA"] },
      metadata: {
        store: "La Khalaba Boutique",
        website: "https://la-khalaba.vercel.app",
      },
    });

    console.log("✅ Stripe session created:", session.id);

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("❌ Checkout Error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong during checkout. Please try again." },
      { status: 500 }
    );
  }
};
