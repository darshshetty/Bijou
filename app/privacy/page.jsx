import LegalPage from '@/components/LegalPage';
import { PRIVACY } from '@/lib/legal';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
