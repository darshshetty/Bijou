import Link from 'next/link';
import Steps from '@/components/Steps';
import { CONTACT } from '@/lib/content';

export const metadata = { title: 'Book a design session' };

const STEPS = [
  ['Talk through your vision', 'Your story, their style, what you’ve saved — and what you definitely don’t want.'],
  ['Shape the design live', 'Adjust proportions, setting height, band width and details on screen in real time.'],
  ['Choose your lab-grown diamond', 'Compare stones for size, color and clarity within your budget.'],
];

export default function SessionPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <>
      <div className="wrap"><Steps current={2} /></div>
      <main className="wrap page">
        <div className="two-col" style={{ gap: 48 }}>
          <div className="col-main" style={{ flex: '1 1 440px', gap: 28 }}>
            <div className="stack" style={{ gap: 14 }}>
              <h1 className="page-title">Design with our team.</h1>
              <p className="muted" style={{ fontSize: 18 }}>Share your screen, your photos, your story. We refine your ring live and you leave with a design ready for its 3D model.</p>
              <div className="row small" style={{ gap: 10 }}>
                {['60 minutes', 'Zoom video call', 'Complimentary'].map((t) => (
                  <span key={t} style={{ border: '1px solid var(--muted)', borderRadius: 2, padding: '6px 14px' }}>{t}</span>
                ))}
              </div>
            </div>
            <img src="/images/couple-amalfi.jpg" alt="A laughing couple by the sea as she shows her engagement ring" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: 'center 42%', borderRadius: 2 }} />
            <ol className="stack" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 18 }}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className="row" style={{ gap: 16, flexWrap: 'nowrap' }}>
                  <span style={{ fontWeight: 700, minWidth: 20 }}>{i + 1}</span>
                  <span className="stack" style={{ gap: 2 }}><strong style={{ fontWeight: 600 }}>{t}</strong><span className="muted">{d}</span></span>
                </li>
              ))}
            </ol>
            <p className="notice">Your saved design and any inspiration photos are shared with your designer before the call.</p>
          </div>

          <div className="col-side" style={{ flex: '1 1 520px' }}>
            <div className="panel" style={{ padding: 'clamp(16px, 2vw, 24px)' }}>
              <h2 style={{ fontSize: 26 }}>Pick a time</h2>
              {calendly ? (
                <iframe className="calendly" title="Book a design session" src={`${calendly}${calendly.includes('?') ? '&' : '?'}hide_gdpr_banner=1&background_color=faf7f2&primary_color=1f1b17`} />
              ) : (
                <div className="stack" style={{ gap: 12 }}>
                  <p className="muted">Online booking is coming soon. To book a session now, email or call us and we’ll find a time.</p>
                  <div className="btn-row">
                    <a className="btn" href={`mailto:${CONTACT.email}?subject=Design%20session`}>Email us</a>
                    <a className="btn btn--ghost" href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
                  </div>
                </div>
              )}
            </div>
            <Link href="/model" className="small" style={{ fontWeight: 600 }}>Skip — my design is final</Link>
          </div>
        </div>
      </main>
    </>
  );
}
