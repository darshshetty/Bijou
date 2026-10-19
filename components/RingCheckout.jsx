'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadDesign } from '@/lib/design-store';
import { startCheckout } from '@/lib/checkout-client';
import { DEFAULT_DESIGN, describe, price, usdExact } from '@/lib/pricing';
import { POLICY } from '@/lib/content';

export default function RingCheckout() {
  const [{ design, img }, setSaved] = useState({ design: DEFAULT_DESIGN, img: null });
  const [agree, setAgree] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setSaved(loadDesign()); }, []);

  const info = describe(design);
  const total = usdExact(price(design));

  async function pay() {
    if (!agree) { setError('Tick the box to confirm your design is final and you agree to the terms.'); return; }
    setError('');
    setPaying(true);
    try { await startCheckout('ring', design); } catch (e) { setError(e.message); setPaying(false); }
  }

  return (
    <main className="wrap page">
      <div className="two-col" style={{ gap: 48 }}>
        <div className="col-main" style={{ flex: '999 1 520px', gap: 24 }}>
          <div className="stack" style={{ gap: 10 }}>
            <h1 className="page-title">Checkout</h1>
            <p className="muted" style={{ fontSize: 17, maxWidth: 600 }}>Pay for your ring to begin crafting. Your lab-grown diamond is set and finished by hand in 3–5 weeks.</p>
          </div>

          <section className="stack" style={{ gap: 14, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
            <h2 style={{ fontSize: 20 }}>What happens next</h2>
            <ol className="stack muted" style={{ margin: 0, paddingLeft: 20, gap: 6 }}>
              <li>On our secure Stripe page, enter your contact details, shipping address and card.</li>
              <li>Sales tax is calculated from your shipping address before you pay.</li>
              <li>We confirm your order by email and our jewelers begin crafting.</li>
            </ol>
            <p className="notice">Fully insured, signature-required delivery. Included with every ring.</p>
          </section>

          <section className="stack" style={{ gap: 14, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
            <h2 style={{ fontSize: 20 }}>Review &amp; confirm</h2>
            <p className="small muted" style={{ background: 'var(--sand)', padding: '14px 16px', borderRadius: 2 }}>{POLICY.returns} {POLICY.resizing} {POLICY.warranty}</p>
            <label className="check"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /><span>My design is final and will be made to order. I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.</span></label>
            <button type="button" className="btn btn--block" style={{ minHeight: 56, fontSize: 16 }} onClick={pay} disabled={paying}>
              {paying ? 'Opening secure checkout…' : `Pay ${total}`}
            </button>
            {error && <p className="notice notice--error" role="alert">{error}</p>}
            <Link href="/model#approve" className="small" style={{ fontWeight: 600 }}>Back to approval</Link>
          </section>
        </div>

        <aside className="panel panel--sand" style={{ flex: '1 1 360px' }} aria-label="Order summary">
          <div className="row" style={{ gap: 16, alignItems: 'center', flexWrap: 'nowrap' }}>
            <img src={img || '/images/order-thumb-round-yg.jpg'} alt="Your ring design" style={{ width: 88, height: 88, flex: '0 0 88px', objectFit: 'cover', borderRadius: 2, background: '#E4E4E4' }} />
            <div><div style={{ fontSize: 20, fontWeight: 600 }}>Your ring</div><div className="small muted">{info.shape} · {design.carat} ct lab-grown</div></div>
          </div>
          <dl className="stack small" style={{ margin: 0, gap: 8 }}>
            {[['Diamond', `${info.shape}, ${design.carat} ct`], ['Color / clarity', info.colorClarity], ['Setting', info.setting], ['Band', info.band], ['Metal', info.metal], ['Ring size', info.size]].map(([k, v]) => (
              <div key={k} className="row" style={{ justifyContent: 'space-between', gap: 12 }}><dt className="muted">{k}</dt><dd style={{ margin: 0, fontWeight: 600, textAlign: 'right' }}>{v}</dd></div>
            ))}
          </dl>
          <div className="line-items" style={{ borderColor: '#D8CBB8' }}>
            <div><span>Ring</span><strong>{total}</strong></div>
            <div className="muted"><span>IGI grading report</span><span>Included</span></div>
            <div className="muted"><span>Insured shipping</span><span>Included</span></div>
            <div className="muted"><span>Sales tax</span><span>Calculated at payment</span></div>
            <div className="total" style={{ borderColor: '#D8CBB8' }}><span>Due today</span><span>{total} + tax</span></div>
          </div>
          <p className="tiny muted">Your $100 3D model was paid separately and isn’t part of this total.</p>
        </aside>
      </div>
    </main>
  );
}
