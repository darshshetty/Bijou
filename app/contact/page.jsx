import Link from 'next/link';
import Faq from '@/components/Faq';
import { CONTACT, CONTACT_FAQS } from '@/lib/content';

export const metadata = { title: 'Contact us', description: 'Questions about your ring? Email, call or book a Zoom session with the Bijou design team.' };

const iconProps = { width: 36, height: 36, viewBox: '0 0 24 24', fill: 'none', stroke: '#1F1B17', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export default function ContactPage() {
  return (
    <main>
      <section className="wrap center stack" style={{ paddingTop: 88, paddingBottom: 56, gap: 14, alignItems: 'center' }}>
        <h1 className="h1">Bijou at your service</h1>
        <p className="muted" style={{ fontSize: 18, maxWidth: 560 }}>Have a question or concern? Our team is standing by to help.</p>
      </section>

      <section className="wrap contact-cards" aria-label="Ways to reach us">
        <div className="contact-card">
          <svg {...iconProps}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></svg>
          <h2>Meet us virtually</h2>
          <p className="muted">Complimentary Zoom session.</p>
          <Link className="btn" href="/session">Book a session</Link>
        </div>
        <div className="contact-card">
          <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          <h2>Send an email</h2>
          <p className="muted">{CONTACT.email}</p>
          <a className="btn" href={`mailto:${CONTACT.email}`}>Email us</a>
        </div>
        <div className="contact-card">
          <svg {...iconProps}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          <h2>Call us</h2>
          <p className="muted">{CONTACT.phone}</p>
          <a className="btn" href={CONTACT.phoneHref}>Call now</a>
        </div>
      </section>

      <section className="wrap center stack" style={{ paddingTop: 48, gap: 6, alignItems: 'center' }} aria-labelledby="hours">
        <h2 id="hours" style={{ fontSize: 15 }}>Hours of operation</h2>
        <p style={{ fontSize: 17 }}>{CONTACT.hours}</p>
      </section>

      <Faq items={CONTACT_FAQS} title="Frequently asked questions" />
      <p className="wrap center muted" style={{ marginTop: -56, paddingBottom: 88 }}>
        Still have a question? <a href={`mailto:${CONTACT.email}`} style={{ fontWeight: 600 }}>Email us</a> or <a href={CONTACT.phoneHref} style={{ fontWeight: 600 }}>call {CONTACT.phone}</a>.
      </p>
    </main>
  );
}
