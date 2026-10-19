'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set('kind', 'newsletter');
    setStatus('sending');
    const res = await fetch('/api/inquiry', { method: 'POST', body: form }).catch(() => null);
    setStatus(res && res.ok ? 'done' : 'error');
  }

  if (status === 'done') return <p className="small">You’re on the list.</p>;
  return (
    <form onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="news-email">Email</label>
      <input id="news-email" name="email" type="email" required placeholder="Email" autoComplete="email" />
      <button type="submit" disabled={status === 'sending'}>Join</button>
      {status === 'error' && <span className="sr-only" role="status">Couldn’t sign you up. Try again.</span>}
    </form>
  );
}
