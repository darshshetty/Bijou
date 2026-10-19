import { Suspense } from 'react';
import Builder from '@/components/Builder';
import Steps from '@/components/Steps';

export const metadata = { title: 'Design your ring' };

export default function DesignPage() {
  return (
    <>
      <div className="wrap"><Steps current={1} /></div>
      <Suspense fallback={<main className="wrap page"><h1 className="page-title">Design your ring</h1></main>}>
        <Builder />
      </Suspense>
    </>
  );
}
