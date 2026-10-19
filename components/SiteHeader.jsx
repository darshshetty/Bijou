import Link from 'next/link';

export default function SiteHeader() {
  return (
    <>
      <Link className="promo" href="/model">Hold a 3D model of your ring before we craft it — $100</Link>
      <header className="header">
        <div className="wrap header__inner">
          <details className="menu">
            <summary aria-label="Menu">Menu</summary>
            <nav aria-label="Mobile">
              <Link href="/#shop">Engagement</Link>
              <Link href="/#how">How it works</Link>
              <Link href="/session">Book a designer</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </details>
          <nav className="header__nav" aria-label="Main">
            <Link href="/#shop">Engagement</Link>
            <Link href="/#how">How it works</Link>
          </nav>
          <Link href="/" className="logo" aria-label="Bijou home">BIJOU</Link>
          <div className="header__right">
            <Link className="hide-sm" href="/session">Book a designer</Link>
            <Link className="hide-sm" href="/contact">Contact</Link>
            <Link className="btn" href="/design">Start designing</Link>
          </div>
        </div>
      </header>
    </>
  );
}
