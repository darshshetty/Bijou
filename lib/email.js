import { Resend } from 'resend';

/**
 * Sends an email through Resend. Returns false (without throwing) when email isn't configured,
 * so forms fail with a clear message instead of crashing.
 */
export async function sendEmail({ to, subject, text, replyTo, attachments }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set; email not sent:', subject);
    return false;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Bijou <hello@bijouai.co>',
    to: to || process.env.EMAIL_TO || 'help@bijouai.co',
    subject,
    text,
    replyTo,
    attachments,
  });
  if (error) {
    console.error('Resend error', error);
    return false;
  }
  return true;
}
