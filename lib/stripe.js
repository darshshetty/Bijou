import Stripe from 'stripe';

let client = null;

/** Returns a Stripe client, or null when STRIPE_SECRET_KEY isn't set yet. */
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
