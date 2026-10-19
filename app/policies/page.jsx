import Link from 'next/link';
import { CONTACT, POLICY } from '@/lib/content';

export const metadata = { title: 'Policies' };

export default function PoliciesPage() {
  return (
    <main className="wrap page">
      <div className="prose">
        <h1 className="page-title">Policies</h1>

        <h2 id="shipping">Shipping</h2>
        <p className="muted">3D-printed models ship within 3 business days; delivery time depends on the carrier and your ZIP code. Finished rings are crafted in 3–5 weeks and ship fully insured with signature required. We currently ship within the United States.</p>

        <h2 id="returns">Returns, resizing &amp; warranty</h2>
        <p className="muted">{POLICY.returns}</p>
        <p className="muted">{POLICY.resizing}</p>
        <p className="muted">{POLICY.warranty}</p>
        <p className="muted">The $100 3D model fee covers your printed model and its shipping. It isn’t credited toward your ring.</p>

        <h2 id="legal">Terms &amp; privacy</h2>
        <p className="muted">Read our full <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>

        <p className="muted">Questions? Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>
      </div>
    </main>
  );
}
