import Link from 'next/link';
import Steps from '@/components/Steps';
import { getStripe } from '@/lib/stripe';
import { CONTACT } from '@/lib/content';

export const metadata = { title: 'Order confirmed' };
export const dynamic = 'force-dynamic';

export default async function SuccessPage({ searchParams }) {
  const { session_id: sessionId } = (await searchParams) || {};
  let session = null;
  const stripe = getStripe();
  if (stripe && sessionId) {
    try { session = await stripe.checkout.sessions.retrieve(sessionId); } catch { session = null; }
  }
  const email = session?.customer_details?.email;
  const total = session ? `$${(session.amount_total / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : null;
  const orderNo = sessionId ? `BJ-${sessionId.slice(-8).toUpperCase()}` : null;

  return (
    <>
      <div className="wrap"><Steps current={4} /></div>
      <main className="wrap page" style={{ maxWidth: 860, marginLeft: 'auto', marginRight: 'auto' }}>
        {orderNo && <p className="small" style={{ fontWeight: 600 }}>Order {orderNo}</p>}
        <h1 className="h1">Your ring is being made.</h1>
        <p className="muted" style={{ fontSize: 17 }}>
          {total ? `We’ve received your payment of ${total}` : 'We’ve received your order'}
          {email ? ` and sent a confirmation to ${email}.` : '.'} Our jewelers begin crafting now.
        </p>
        <ol className="stack" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {[
            ['Crafting begins', 'Your lab-grown diamond is set and finished by hand in 3–5 weeks.'],
            ['Insured shipping', 'We email tracking the moment it ships. Signature required on delivery.'],
            ['Delivered', 'Your ring is covered by our 60-day warranty against manufacturing defects.'],
          ].map(([t, d], i) => (
            <li key={t} className="row" style={{ gap: 16, padding: '18px 0', borderTop: '1px solid var(--line)', flexWrap: 'nowrap' }}>
              <span style={{ fontWeight: 600, minWidth: 24 }}>{i + 1}</span>
              <span><strong>{t}</strong><br /><span className="muted">{d}</span></span>
            </li>
          ))}
        </ol>
        <div className="btn-row">
          <Link className="btn" href="/">Back to home</Link>
          <a className="btn btn--ghost" href={`mailto:${CONTACT.email}`}>Questions? Email us</a>
        </div>
      </main>
    </>
  );
}
