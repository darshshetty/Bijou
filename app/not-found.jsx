import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap page" style={{ minHeight: '50vh', justifyContent: 'center' }}>
      <h1 className="page-title">We couldn’t find that page.</h1>
      <p className="muted">It may have moved. Start from the homepage or design your ring.</p>
      <div className="btn-row"><Link className="btn" href="/">Go to homepage</Link><Link className="btn btn--ghost" href="/design">Design your ring</Link></div>
    </main>
  );
}
