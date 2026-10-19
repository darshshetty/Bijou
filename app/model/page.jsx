import { Suspense } from 'react';
import Steps from '@/components/Steps';
import ModelOrder from '@/components/ModelOrder';

export const metadata = { title: 'Your 3D model' };

export default function ModelPage() {
  return (
    <>
      <div className="wrap"><Steps current={3} /></div>
      <Suspense fallback={<main className="wrap page" />}>
        <ModelOrder />
      </Suspense>
    </>
  );
}
