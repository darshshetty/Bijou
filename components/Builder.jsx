'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { presets, rings } from '@/lib/data';
import { shapePath } from '@/lib/shapes';
import { saveDesign } from '@/lib/design-store';
import {
  BANDS, CARATS, CLARITIES, COLORS, DEFAULT_DESIGN, METALS, PRONGS, SETTINGS, SHAPES, SIZES,
  describe, estimateRange, sanitizeDesign,
} from '@/lib/pricing';

const LOVES = ['The diamond shape', 'The setting', 'The band', 'The overall look'];
const BUDGETS = ['Under $2,000', '$2,000–$4,000', '$4,000–$7,000', '$7,000+', 'Not sure yet'];

function OptionRow({ label, options, value, onPick, suffix }) {
  return (
    <fieldset>
      <legend className="opt-label">{label}{suffix ? <span className="muted" style={{ fontWeight: 400 }}> — {suffix}</span> : null}</legend>
      <div className="opt-row">
        {options.map((o) => (
          <button key={o.id} type="button" className="opt" aria-pressed={value === o.id} onClick={() => onPick(o.id)}>{o.name}</button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Builder() {
  const router = useRouter();
  const params = useSearchParams();

  const [mode, setMode] = useState(params.get('mode') === 'upload' ? 'upload' : 'design');
  const [design, setDesign] = useState(() => sanitizeDesign({ ...DEFAULT_DESIGN, ...Object.fromEntries(params.entries()) }));
  const [fav, setFav] = useState(null); // { name, img, pos, label }
  const [view, setView] = useState('top');

  // Match the closest studio photo to the current choices (shape counts most, then metal, then band).
  const best = useMemo(() => {
    const metal = design.metal === 'platinum' ? 'white' : design.metal;
    const score = (r) => (r.shape === design.shape ? 3 : 0) + (r.metal === metal ? 2 : 0) + (r.band === design.band ? 1 : 0);
    return rings.reduce((a, b) => (score(b) > score(a) ? b : a));
  }, [design.shape, design.metal, design.band]);

  const photo = fav
    ? { img: fav.img, pos: fav.pos, name: fav.label, alt: `Customer story: ${fav.label}` }
    : { img: best[view], pos: 'center', name: best.name, alt: `${view === 'top' ? 'Top' : 'Side'} view of a ${best.alt}` };

  useEffect(() => { saveDesign(design, photo.img); }, [design, photo.img]);

  // Changing the look clears a highlighted customer story; changing carat or quality does not.
  const update = (key, value) => {
    setDesign((d) => ({ ...d, [key]: value }));
    if (!['carat', 'color', 'clarity', 'size'].includes(key)) setFav(null);
  };

  const pickPreset = (p) => {
    setDesign((d) => sanitizeDesign({ ...d, ...p.s }));
    setFav({ name: p.name, img: p.img, pos: p.pos, label: `${p.name} · ${p.desc}` });
  };

  const pickPhoto = (r, v) => {
    setDesign((d) => sanitizeDesign({ ...d, carat: r.carat, shape: r.shape, metal: r.metal, band: r.band, setting: 'solitaire' }));
    setView(v);
    setFav(null);
  };

  const info = describe(design);

  return (
    <main className="wrap page">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
        <h1 className="page-title">Design your ring</h1>
        <div className="tabs" role="tablist" aria-label="How do you want to start?">
          <button type="button" role="tab" aria-selected={mode === 'design'} onClick={() => setMode('design')}>Build it here</button>
          <button type="button" role="tab" aria-selected={mode === 'upload'} onClick={() => setMode('upload')}>Start from a photo</button>
        </div>
      </div>

      {mode === 'design' ? (
        <>
          <div className="two-col">
            <div className="col-main">
              <div className="preview">
                <img src={photo.img} alt={photo.alt} style={{ objectPosition: photo.pos }} />
                <div className="preview__chip">{info.shape} · {design.carat} ct lab-grown</div>
                <div className="preview__caption">Shown: {photo.name} · your 3D model shows your exact design</div>
              </div>
              <div className="thumbs" role="group" aria-label="Ring photos">
                {rings.flatMap((r) => ['top', 'angle'].map((v) => (
                  <button key={r.id + v} type="button" aria-label={`${r.name}, ${v === 'top' ? 'top' : 'side'} view`}
                    aria-pressed={!fav && r.id === best.id && v === view} onClick={() => pickPhoto(r, v)}>
                    <img src={r[v]} alt="" loading="lazy" />
                  </button>
                )))}
              </div>

              <div className="panel">
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <h2 style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em' }}>Your ring</h2>
                  <div className="small muted">Estimated <strong style={{ color: 'var(--ink)', fontSize: 18 }}>{estimateRange(design)}</strong></div>
                </div>
                <p className="tiny muted" style={{ marginTop: -8 }}>Ballpark based on current lab-grown prices. Your exact quote comes with your final design.</p>
                <dl className="summary">
                  {[['Diamond', `${info.shape}, ${design.carat} ct`], ['Color / clarity', info.colorClarity], ['Setting', info.setting], ['Band', info.band], ['Metal', info.metal], ['Ring size', design.size]].map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
                <div className="row" style={{ gap: 10 }}>
                  <button type="button" className="btn" style={{ flex: '1 1 240px' }} onClick={() => { saveDesign(design, photo.img); router.push('/model'); }}>
                    Design is final — order 3D model · $100
                  </button>
                  <Link className="btn btn--ghost" style={{ flex: '1 1 220px' }} href="/session">Refine with a designer (60 min)</Link>
                </div>
                <SaveDesign design={design} />
              </div>
            </div>

            <div className="col-side">
              <fieldset>
                <legend className="opt-label">1 · Diamond shape <span className="muted" style={{ fontWeight: 400 }}>— {info.shape}</span></legend>
                <div className="shape-grid">
                  {SHAPES.map((s) => (
                    <button key={s.id} type="button" className="shape-btn" aria-pressed={design.shape === s.id} onClick={() => update('shape', s.id)}>
                      <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true"><path d={shapePath(s.id, 24, 24, 12).d} fill="#F1F4F8" stroke="#211C18" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                      {s.name}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="opt-label">2 · Carat weight</legend>
                <div className="opt-row">
                  {CARATS.map((c) => (
                    <button key={c} type="button" className="opt" style={{ minWidth: 72 }} aria-pressed={design.carat === c} onClick={() => update('carat', c)}>{c} ct</button>
                  ))}
                </div>
                <p className="tiny muted" style={{ marginTop: 10 }}>Looking for more than 5 ct? <Link href="/session" style={{ fontWeight: 600 }}>Talk to a designer</Link></p>
              </fieldset>

              <div className="row" style={{ gap: 16 }}>
                <label className="field">Color
                  <select className="select" value={design.color} onChange={(e) => update('color', e.target.value)}>
                    {COLORS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>
                <label className="field">Clarity
                  <select className="select" value={design.clarity} onChange={(e) => update('clarity', e.target.value)}>
                    {CLARITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
              </div>

              <div className="stack" style={{ gap: 12 }}>
                <OptionRow label="3 · Setting" options={SETTINGS} value={design.setting} onPick={(v) => update('setting', v)} />
                {design.setting !== 'bezel' && (
                  <div className="opt-row" style={{ alignItems: 'center' }}>
                    <span className="tiny muted" style={{ marginRight: 4 }}>Prongs</span>
                    {PRONGS.map((p) => (
                      <button key={p.id} type="button" className="opt" style={{ minHeight: 40, fontSize: 13 }} aria-pressed={design.prongs === p.id} onClick={() => update('prongs', p.id)}>{p.name}</button>
                    ))}
                  </div>
                )}
              </div>

              <OptionRow label="4 · Band" options={BANDS} value={design.band} onPick={(v) => update('band', v)} />

              <fieldset>
                <legend className="opt-label">5 · Metal <span className="muted" style={{ fontWeight: 400 }}>— {info.metal}</span></legend>
                <div className="opt-row" style={{ gap: 12 }}>
                  {METALS.map((m) => (
                    <button key={m.id} type="button" className="swatch" style={{ background: m.c }} aria-label={m.name} aria-pressed={design.metal === m.id} onClick={() => update('metal', m.id)} />
                  ))}
                </div>
              </fieldset>

              <label className="field" style={{ flex: '0 0 auto' }}>6 · Ring size
                <select className="select" value={design.size} onChange={(e) => update('size', e.target.value)}>
                  {SIZES.map((s) => <option key={s} value={s}>{s === 'Not sure yet' ? 'I’m not sure yet' : s}</option>)}
                </select>
              </label>
            </div>
          </div>

          <Stories presets={presets} activeName={fav?.name} onPick={pickPreset} />
        </>
      ) : (
        <>
          <InspirationUpload onBack={() => setMode('design')} />
          <Stories presets={presets} activeName={null} onPick={(p) => { pickPreset(p); setMode('design'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </>
      )}
    </main>
  );
}

function Stories({ presets: list, activeName, onPick }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(180, el.clientWidth - 180), behavior: 'smooth' });
  };
  return (
    <section className="stack" style={{ gap: 12 }} aria-label="Customer stories">
      <div className="carousel-head">
        <div className="stack" style={{ gap: 2 }}>
          <h2 style={{ fontSize: 17 }}>Customer stories</h2>
          <span className="tiny muted">Real rings to start from. Tap one to see it up close and load its details</span>
        </div>
        <div className="arrows">
          <button type="button" className="arrow" aria-label="Previous stories" onClick={() => scroll(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" className="arrow arrow--dark" aria-label="Next stories" onClick={() => scroll(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div className="scroller scroller--tight" ref={ref}>
        {list.map((p) => (
          <button key={p.name} type="button" className="fav" aria-pressed={activeName === p.name} onClick={() => onPick(p)}>
            <img src={p.img} alt="" style={{ objectPosition: p.pos }} loading="lazy" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
            <span>{p.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SaveDesign({ design }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set('kind', 'save-design');
    form.set('design', JSON.stringify(design));
    setStatus('sending');
    const res = await fetch('/api/inquiry', { method: 'POST', body: form }).catch(() => null);
    setStatus(res && res.ok ? 'done' : 'error');
  }

  if (!open) return <button type="button" className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setOpen(true)}>Save design &amp; email it to me</button>;
  if (status === 'done') return <p className="notice">Sent. Check your inbox for your design.</p>;
  return (
    <form onSubmit={onSubmit} className="row" style={{ gap: 10, alignItems: 'flex-end' }}>
      <label className="field">Your email<input className="input" name="email" type="email" required autoComplete="email" /></label>
      <button className="btn btn--ghost" type="submit" disabled={status === 'sending'}>Email my design</button>
      {status === 'error' && <p className="notice notice--error" role="alert" style={{ flexBasis: '100%' }}>We couldn’t send that. Try again, or email {`help@bijouai.co`}.</p>}
    </form>
  );
}

function InspirationUpload({ onBack }) {
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set('kind', 'inspiration');
    setStatus('sending');
    const res = await fetch('/api/inquiry', { method: 'POST', body: form }).catch(() => null);
    setStatus(res && res.ok ? 'done' : 'error');
  }

  if (status === 'done') {
    return (
      <div className="panel panel--sand" style={{ maxWidth: 860, padding: 'clamp(32px, 5vw, 72px)', alignItems: 'flex-start', gap: 20 }}>
        <h2 className="h2">Your inspiration is with our designers.</h2>
        <p className="muted">We’ll email your first design soon. From there you can tweak it online, book a session with us, or go straight to your 3D model.</p>
        <div className="btn-row">
          <Link className="btn" href="/session">Book a design session (optional)</Link>
          <button type="button" className="btn btn--ghost" onClick={onBack}>Keep designing online</button>
        </div>
      </div>
    );
  }

  return (
    <form className="two-col" onSubmit={onSubmit}>
      <div className="col-main">
        <label htmlFor="insp" className="dropzone">
          {preview ? <img src={preview} alt="Your inspiration photo" /> : (
            <>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#211C18" strokeWidth="1.2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></svg>
              <strong style={{ fontSize: 20, fontWeight: 400 }}>Drop your inspiration here</strong>
              <span className="muted" style={{ maxWidth: 360 }}>A screenshot, a Pinterest pin, a photo of a family ring — anything that shows what you love. JPG, PNG or HEIC, up to 4 MB.</span>
              <span className="btn">Choose a photo</span>
            </>
          )}
          <input id="insp" name="photo" type="file" accept="image/*" required className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)); }} />
        </label>
        <p className="tiny muted">{preview ? 'Tap the photo to replace it.' : 'Your photo is only shared with our design team.'}</p>
      </div>
      <div className="col-side" style={{ gap: 16 }}>
        <div className="stack" style={{ gap: 6 }}>
          <h2 style={{ fontSize: 26, fontWeight: 400 }}>Tell us what caught your eye</h2>
          <p className="muted">Our designers use your photo as a starting point and send back a design made for you — never a copy.</p>
        </div>
        <fieldset className="stack" style={{ gap: 8 }}>
          <legend className="opt-label">What do you love about it?</legend>
          {LOVES.map((l) => <label key={l} className="check"><input type="checkbox" name="loves" value={l} />{l}</label>)}
        </fieldset>
        <label className="field">Anything you’d change?<textarea className="textarea" name="message" /></label>
        <label className="field">Budget
          <select className="select" name="budget" defaultValue="Not sure yet">{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
        <label className="field">Email<input className="input" name="email" type="email" required autoComplete="email" /></label>
        <button className="btn btn--block" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send to our design team'}</button>
        {status === 'error' && <p className="notice notice--error" role="alert">We couldn’t send your photo. Check it’s under 4 MB and try again.</p>}
        <p className="small muted">Want to talk it through live? <Link href="/session" style={{ fontWeight: 600 }}>Book a 60-min Zoom session</Link></p>
      </div>
    </form>
  );
}
