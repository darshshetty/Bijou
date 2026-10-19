import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { MODEL_PRICE, describe, price, sanitizeDesign } from '@/lib/pricing';

export const runtime = 'nodejs';

// Creates a Stripe Checkout session for either the $100 3D model or the finished ring.
// Prices are always recomputed here from the design so they can't be changed in the browser.
export async function POST(req) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Payments aren’t set up yet. Add STRIPE_SECRET_KEY in your Vercel settings.' }, { status: 503 });
  }

  let body;
  try { body = await req.json(); } catch { body = {}; }
  const kind = body.kind === 'ring' ? 'ring' : 'model';
  const design = sanitizeDesign(body.design);
  const info = describe(design);

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'http://localhost:3000';
  const amount = kind === 'ring' ? price(design) : MODEL_PRICE;
  const name = kind === 'ring' ? `Bijou engagement ring — ${info.shape} ${design.carat} ct` : 'Bijou 3D-printed design model';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(amount * 100),
          tax_behavior: 'exclusive',
          product_data: { name, description: `${info.line} · ${info.size}` },
        },
      }],
      shipping_address_collection: { allowed_countries: ['US'] },
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      automatic_tax: { enabled: process.env.STRIPE_TAX === 'true' },
      metadata: { kind, ...design, summary: info.line.slice(0, 450) },
      success_url: kind === 'ring'
        ? `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/model?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: kind === 'ring' ? `${origin}/checkout` : `${origin}/model`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error', err);
    return NextResponse.json({ error: 'We couldn’t open checkout. Please try again or contact help@bijouai.co.' }, { status: 500 });
  }
}
