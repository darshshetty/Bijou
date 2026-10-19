import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

// Stripe calls this after a successful payment. It emails you the order details.
export async function POST(req) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 });

  const signature = req.headers.get('stripe-signature');
  const payload = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    console.error('Webhook signature check failed', err.message);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const m = s.metadata || {};
    const addr = s.shipping_details?.address || s.collected_information?.shipping_details?.address || {};
    const name = s.shipping_details?.name || s.collected_information?.shipping_details?.name || s.customer_details?.name || '';
    const kindLabel = m.kind === 'ring' ? 'RING ORDER' : '3D MODEL ORDER';
    await sendEmail({
      subject: `${kindLabel} — $${(s.amount_total / 100).toFixed(2)} — ${s.customer_details?.email || ''}`,
      replyTo: s.customer_details?.email || undefined,
      text: [
        `${kindLabel} paid`,
        `Total: $${(s.amount_total / 100).toFixed(2)} (tax: $${((s.total_details?.amount_tax || 0) / 100).toFixed(2)})`,
        `Customer: ${name} · ${s.customer_details?.email || ''} · ${s.customer_details?.phone || ''}`,
        `Ship to: ${[addr.line1, addr.line2, addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')}`,
        '',
        `Design: ${m.summary || ''}`,
        `Size: ${m.size || ''}`,
        '',
        `Stripe session: ${s.id}`,
      ].join('\n'),
    });
  }

  return NextResponse.json({ received: true });
}
