'use client';

/** Asks our API for a Stripe Checkout page and sends the customer there. */
export async function startCheckout(kind, design) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, design }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || 'Checkout is unavailable right now. Please try again or contact help@bijouai.co.');
  window.location.href = data.url;
}
