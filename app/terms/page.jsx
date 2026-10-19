import LegalPage from '@/components/LegalPage';
import { TERMS } from '@/lib/legal';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
