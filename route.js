import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { describe, estimateRange, sanitizeDesign } from '@/lib/pricing';

export const runtime = 'nodejs';

const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // Vercel limits request bodies to ~4.5 MB
const SUBJECTS = {
  inspiration: 'New inspiration photo',
  changes: 'Design change request',
  'save-design': 'Saved design',
  newsletter: 'Newsletter sign-up',
};

// Handles every form on the site: inspiration uploads, change requests, saved designs and newsletter sign-ups.
export async function POST(req) {
  let form;
  try { form = await req.formData(); } catch { return NextResponse.json({ error: 'Invalid form.' }, { status: 400 }); }

  const kind = String(form.get('kind') || '');
  if (!SUBJECTS[kind]) return NextResponse.json({ error: 'Unknown form.' }, { status: 400 });

  const email = String(form.get('email') || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });

  const lines = [`From: ${email}`];
  const message = String(form.get('message') || '').trim();
  const budget = String(form.get('budget') || '').trim();
  const loves = form.getAll('loves').map(String);
  if (loves.length) lines.push(`Loves: ${loves.join(', ')}`);
  if (budget) lines.push(`Budget: ${budget}`);
  if (message) lines.push('', message);

  let designText = '';
  if (form.get('design')) {
    try {
      const d = sanitizeDesign(JSON.parse(String(form.get('design'))));
      const info = describe(d);
      designText = `${info.line} · ${info.size}\nEstimate: ${estimateRange(d)}`;
      lines.push('', 'Design:', designText);
    } catch { /* ignore malformed design */ }
  }

  const attachments = [];
  const photo = form.get('photo');
  if (photo && typeof photo === 'object' && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) return NextResponse.json({ error: 'Photo must be under 4 MB.' }, { status: 413 });
    const buffer = Buffer.from(await photo.arrayBuffer());
    attachments.push({ filename: photo.name || 'inspiration.jpg', content: buffer });
  }

  const ok = await sendEmail({
    subject: `${SUBJECTS[kind]} — ${email}`,
    text: lines.join('\n'),
    replyTo: email,
    attachments: attachments.length ? attachments : undefined,
  });

  // Send the customer a copy of their saved design.
  if (ok && kind === 'save-design' && designText) {
    await sendEmail({
      to: email,
      subject: 'Your Bijou ring design',
      text: `Here’s the design you saved on bijouai.co:\n\n${designText}\n\nPick up where you left off: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://bijouai.co'}/design\n\nQuestions? Reply to this email or call (972) 890-4391.`,
      replyTo: process.env.EMAIL_TO || 'help@bijouai.co',
    });
  }

  if (!ok) return NextResponse.json({ error: 'Email isn’t set up yet.' }, { status: 503 });
  return NextResponse.json({ ok: true });
}
