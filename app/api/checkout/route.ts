import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
        return new NextResponse("No items found", { status: 400 });
    }

    const line_items: any = items.map((item: any) => {
      // Assuming price is a string like "$99.00", we need to convert to cents
      const priceString = item.price.replace('$', '').replace(',', '');
      const unitAmount = Math.round(parseFloat(priceString) * 100);

      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: unitAmount,
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart?canceled=1`,
    });

    return NextResponse.json({ url: session.url }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("[CHECKOUT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
