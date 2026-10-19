import Link from 'next/link';
import { CONTACT } from '@/lib/content';
import NewsletterForm from './NewsletterForm';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__cols">
          <nav className="footer__col" aria-label="Contact">
            <span className="footer__label">Contact</span>
            <Link href="/contact">Contact us</Link>
            <Link href="/session">Book a designer</Link>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </nav>
          <nav className="footer__col" aria-label="Support">
            <span className="footer__label">Support</span>
            <Link href="/#how">How it works</Link>
            <Link href="/model">The 3D model</Link>
            <Link href="/policies#returns">Shipping &amp; returns</Link>
          </nav>
          <nav className="footer__col" aria-label="Company">
            <span className="footer__label">Company</span>
            <Link href="/#lab">Lab-grown diamonds</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </nav>
          <div className="footer__news">
            <span className="footer__label">Stay updated</span>
            <p>Be first to hear about new designs.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="footer__base">
          <span className="logo">BIJOU</span>
          <span className="tiny">© {new Date().getFullYear()} Bijou · bijouai.co</span>
        </div>
      </div>
    </footer>
  );
}
