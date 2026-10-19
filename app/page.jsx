import Link from 'next/link';
import SignatureCarousel from '@/components/SignatureCarousel';
import Faq from '@/components/Faq';
import { tiles, moments } from '@/lib/data';
import { HOME_FAQS } from '@/lib/content';

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="Bijou engagement rings">
        <img src="/images/setting-bridal-set.jpg" alt="An oval lab-grown diamond solitaire with a matching eternity band in yellow gold" fetchPriority="high" />
        <div className="hero__shade" />
        <div className="hero__copy">
          <h1>Engagement rings, designed by you</h1>
          <p>Lab-grown diamonds. Your design, held in 3D before it’s made.</p>
          <div className="btn-row">
            <Link className="btn btn--light" href="/design">Design your ring</Link>
            <Link className="btn btn--outline-light" href="/design?mode=upload">Upload a photo</Link>
          </div>
        </div>
      </section>

      <section className="wrap tiles" aria-label="Ways to start">
        {tiles.map((t) => (
          <Link key={t.title} href={t.title === 'Start from a photo' ? '/design?mode=upload' : t.href} className="tile">
            <img src={t.img} alt={t.alt} style={{ objectPosition: t.pos }} loading="lazy" />
            <span className="tile__title">{t.title}</span>
            <span className="tile__cta">{t.cta}</span>
          </Link>
        ))}
      </section>

      <section id="how" className="how section" aria-labelledby="how-title">
        <div className="wrap stack" style={{ gap: 40 }}>
          <h2 id="how-title" className="h2 center">How it works</h2>
          <ol>
            <li><strong>Design your ring</strong><span className="muted">Build it online, or upload a photo of a ring you love.</span></li>
            <li><strong>Refine with a designer</strong><span className="muted">Optional — up to three complimentary 60-minute Zoom sessions to perfect every detail.</span></li>
            <li><strong>Hold your 3D model</strong><span className="muted">For $100, we ship a 3D-printed model to see, feel and try on.</span></li>
            <li><strong>We craft your ring</strong><span className="muted">Once your design is final, we make it with your lab-grown diamond in 3–5 weeks.</span></li>
          </ol>
        </div>
      </section>

      <SignatureCarousel />


      <section className="wrap section stack" style={{ gap: 32 }} aria-labelledby="moments-title">
        <div className="stack" style={{ gap: 6 }}>
          <h2 id="moments-title" className="h2">Made for moments like these</h2>
          <p className="muted">Rings made to be lived in.</p>
        </div>
        <div className="moments">
          {moments.map((m) => <img key={m.img} src={m.img} alt={m.alt} style={{ objectPosition: m.pos }} loading="lazy" />)}
        </div>
      </section>

      <section id="lab" style={{ background: 'var(--sand)' }} aria-labelledby="lab-title">
        <div className="split">
          <img src="/images/lab-light.jpg" alt="A gold diamond eternity band caught in a beam of light" loading="lazy" />
          <div className="split__copy">
            <h2 id="lab-title" className="h2">Lab-grown diamonds</h2>
            <p className="muted">Physically, chemically and optically the same as mined diamonds — grown above ground instead of extracted from it.</p>
            <div className="facts">
              <div><span>Real diamond</span><span className="muted">Same fire, same hardness</span></div>
              <div><span>Independently graded</span><span className="muted">IGI report with every center stone</span></div>
              <div><span>More for your budget</span><span className="muted">Typically less than mined</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section features" aria-label="Try it on and meet us">
        <div className="feature">
          <img src="/images/t-cushion-hand.jpg" alt="A cushion-cut diamond solitaire worn on a hand against soft white fabric" style={{ objectPosition: 'center 52%' }} loading="lazy" />
          <h3 style={{ fontSize: 22 }}>Try it on before it’s forever</h3>
          <p className="muted">Your design, 3D-printed and shipped to you for $100, to approve or change.</p>
          <Link href="/model" className="tile__cta">How the model works</Link>
        </div>
        <div className="feature">
          <img src="/images/couple-amalfi.jpg" alt="A laughing couple by the sea as she shows her engagement ring" style={{ objectPosition: 'center 42%' }} loading="lazy" />
          <h3 style={{ fontSize: 22 }}>Meet us virtually</h3>
          <p className="muted">Book up to three complimentary 60-minute Zoom sessions with our design team.</p>
          <Link href="/session" className="tile__cta">Book a design session</Link>
        </div>
      </section>

      <Faq items={HOME_FAQS} />
    </main>
  );
}
