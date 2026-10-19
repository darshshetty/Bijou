'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadDesign } from '@/lib/design-store';
import { startCheckout } from '@/lib/checkout-client';
import { DEFAULT_DESIGN, MODEL_PRICE, describe, price, usdExact } from '@/lib/pricing';

export default function ModelOrder() {
  const params = useSearchParams();
  const paid = params.get('paid') === '1';
  const [{ design, img }, setSaved] = useState({ design: DEFAULT_DESIGN, img: null });
  const [confirmed, setConfirmed] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [choice, setChoice] = useState(null);

  useEffect(() => { setSaved(loadDesign()); }, []);

  const info = describe(design);

  async function pay() {
    if (!confirmed) { setError('Tick the box to confirm this is the design you want printed.'); return; }
    setError('');
    setPaying(true);
    try { await startCheckout('model', design); } catch (e) { setError(e.message); setPaying(false); }
  }

  return (
    <main className="wrap page" style={{ gap: 88 }}>
      <section className="row" style={{ gap: 48, alignItems: 'flex-start' }}>
        <div className="stack" style={{ flex: '1 1 480px', minWidth: 0, gap: 24 }}>
          <h1 className="page-title">Hold it before it’s forever.</h1>
          <p className="muted" style={{ fontSize: 18, maxWidth: 560 }}>We 3D-print your design and ship it to you. Try it on, then approve it or ask for changes.</p>
          <img className="model-hero" src="/images/model-hero.jpg" alt="An oval diamond solitaire and a diamond eternity band in yellow gold, side by side in a band of light" />
        </div>

        <div className="panel" style={{ flex: '1 1 440px', minWidth: 0, gap: 22 }}>
          {paid ? (
            <div className="stack" style={{ gap: 18 }}>
              <h2 style={{ fontSize: 34 }}>Your model is being printed.</h2>
              <p className="muted">It ships within 3 business days and we’ll email tracking — delivery time depends on the carrier and your ZIP code. When it arrives, come back here to approve or request changes.</p>
              <a href="#approve" style={{ fontWeight: 600 }}>See what happens next</a>
            </div>
          ) : (
            <>
              <div className="row" style={{ gap: 18, alignItems: 'center', flexWrap: 'nowrap' }}>
                <img src={img || '/images/order-thumb-round-yg.jpg'} alt="Your ring design" style={{ width: 96, height: 96, flex: '0 0 96px', objectFit: 'cover', borderRadius: 2, background: '#E4E4E4' }} />
                <div><div style={{ fontSize: 24, lineHeight: 1.2 }}>Your design</div><div className="small muted">{info.line} · {info.size}</div></div>
              </div>
              <div className="line-items">
                <div><span>3D-printed design model</span><strong>{usdExact(MODEL_PRICE)}</strong></div>
                <div className="muted"><span>Insured shipping</span><span>Included</span></div>
                <div className="total"><span>Due today</span><span>{usdExact(MODEL_PRICE)}</span></div>
                <p className="tiny muted">Covers your 3D-printed model and shipping. It’s separate from your ring and isn’t credited toward its price.</p>
              </div>
              <label className="check"><input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />This is the design I want printed. I can still request changes after I see the model.</label>
              <button type="button" className="btn btn--block" style={{ minHeight: 56, fontSize: 16 }} onClick={pay} disabled={paying}>
                {paying ? 'Opening secure checkout…' : 'Pay $100 & print my model'}
              </button>
              {error && <p className="notice notice--error" role="alert">{error}</p>}
              <p className="tiny muted">You’ll enter your shipping address and card on our secure Stripe checkout page.</p>
              <Link href="/design" className="small" style={{ fontWeight: 600 }}>Edit my design</Link>
            </>
          )}
        </div>
      </section>

      <section className="stack" style={{ gap: 32 }} aria-labelledby="flow-title">
        <h2 id="flow-title" className="h2">From model to ring</h2>
        <ol className="timeline">
          <li><strong>Printed &amp; shipped</strong><span className="muted">Your exact design, 3D-printed and shipped within 3 business days. Delivery time depends on the carrier and your ZIP code.</span></li>
          <li><strong>Try it on</strong><span className="muted">Check the stone size, setting height, band width and how it feels day to day.</span></li>
          <li><strong>Change or approve</strong><span className="muted">Request tweaks and we revise. When nothing else needs changing, approve it.</span></li>
          <li><strong>We craft your ring</strong><span className="muted">Your lab-grown diamond is set in solid metal and finished by hand in 3–5 weeks.</span></li>
        </ol>
      </section>

      <section id="approve" className="approve" aria-labelledby="approve-title" style={{ marginBottom: 0 }}>
        <div className="stack" style={{ gap: 12, maxWidth: 720 }}>
          <p className="small" style={{ fontWeight: 600 }}>When your model arrives</p>
          <h2 id="approve-title" className="h2">How does it feel?</h2>
        </div>
        <div className="choice-row">
          <button type="button" className="choice" aria-pressed={choice === 'changes'} onClick={() => setChoice('changes')}>
            <strong>Almost — let’s change something</strong>
            <span>Tell us what to adjust. We revise the design and update your model.</span>
          </button>
          <button type="button" className="choice" aria-pressed={choice === 'approve'} onClick={() => setChoice('approve')}>
            <strong>It’s perfect — craft my ring</strong>
            <span>Approve your final design and pay at checkout. No more changes, and we begin crafting.</span>
          </button>
        </div>
        {choice === 'changes' && <ChangeRequest design={design} />}
        {choice === 'approve' && <Approve design={design} line={`${info.line} · ${info.size}`} />}
      </section>
    </main>
  );
}

function ChangeRequest({ design }) {
  const [status, setStatus] = useState('idle');
  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set('kind', 'changes');
    form.set('design', JSON.stringify(design));
    setStatus('sending');
    const res = await fetch('/api/inquiry', { method: 'POST', body: form }).catch(() => null);
    setStatus(res && res.ok ? 'done' : 'error');
  }
  if (status === 'done') {
    return <div className="card"><h3 style={{ fontSize: 28, fontWeight: 400 }}>Got it — we’re revising your design.</h3><p className="muted">You’ll get the updated design by email, followed by your updated model.</p></div>;
  }
  return (
    <form className="card" onSubmit={onSubmit}>
      <label className="field">What would you like to change?
        <textarea className="textarea" name="message" required placeholder="e.g. The stone feels a little big — try 1.75 ct and a slightly lower setting." />
      </label>
      <label className="field">Your email<input className="input" type="email" name="email" required autoComplete="email" /></label>
      <p className="small muted">Revise your design online as often as you like, and book up to three complimentary design sessions. Each new 3D-printed model is $100.</p>
      <div className="btn-row" style={{ alignItems: 'center' }}>
        <button className="btn" type="submit" disabled={status === 'sending'}>Send my changes</button>
        <Link href="/session" style={{ fontWeight: 600 }}>Or talk it through on Zoom</Link>
      </div>
      {status === 'error' && <p className="notice notice--error" role="alert">We couldn’t send your changes. Try again, or email help@bijouai.co.</p>}
    </form>
  );
}

function Approve({ design, line }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="card" style={{ gap: 18 }}>
      <div style={{ fontWeight: 600, fontSize: 18 }}>Final design: {line}</div>
      <label className="check" style={{ fontSize: 15 }}><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />I approve this as my final design. I understand there are no further modifications once crafting begins.</label>
      <p className="small muted">Your ring is {usdExact(price(design))}, paid in full at checkout. Crafting begins as soon as payment is confirmed, and takes 3–5 weeks.</p>
      {ok
        ? <Link className="btn" style={{ alignSelf: 'flex-start', minHeight: 56 }} href="/checkout">Approve &amp; continue to checkout</Link>
        : <button type="button" className="btn" style={{ alignSelf: 'flex-start', minHeight: 56 }} disabled>Approve &amp; continue to checkout</button>}
    </div>
  );
}
