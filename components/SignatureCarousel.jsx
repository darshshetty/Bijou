'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { products } from '@/lib/data';

function settingFor(name) {
  if (/Halo/.test(name)) return 'halo';
  if (/Three-Stone|Trillion/.test(name)) return 'three';
  return 'solitaire';
}

// 1 ct starting prices, matching the builder's pricing (lib/pricing.js).
function fromPrice(p) {
  const n = 2350 + { solitaire: 0, halo: 700, three: 1500 }[settingFor(p.name)] + (p.band === 'pave' ? 350 : 0) + (p.metal === 'platinum' ? 250 : 0);
  return '$' + n.toLocaleString('en-US');
}

export default function SignatureCarousel() {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(260, el.clientWidth - 260), behavior: 'smooth' });
  };

  return (
    <section id="shop" className="wrap" style={{ paddingTop: 88, paddingBottom: 88 }} aria-labelledby="shop-title">
      <div className="stack" style={{ gap: 28 }}>
        <div className="carousel-head">
          <h2 id="shop-title" className="h2">Signature settings</h2>
          <div className="arrows">
            <button type="button" className="arrow" aria-label="Previous designs" onClick={() => scroll(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="arrow arrow--dark" aria-label="Next designs" onClick={() => scroll(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="scroller" ref={ref}>
          {products.map((p) => {
            const q = new URLSearchParams({ shape: p.shape, metal: p.metal, band: p.band, setting: settingFor(p.name), carat: '1.0' });
            return (
              <Link key={p.name} href={`/design?${q}`} className="sig">
                <img src={p.img} alt={p.alt} style={{ objectPosition: p.pos }} loading="lazy" />
                <span className="stack" style={{ gap: 2 }}>
                  <span className="sig__name">{p.name}</span>
                  <span className="small muted">{p.meta} · from {fromPrice(p)}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
