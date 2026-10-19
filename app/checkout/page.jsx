import Steps from '@/components/Steps';
import RingCheckout from '@/components/RingCheckout';

export const metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <>
      <div className="wrap"><Steps current={4} /></div>
      <RingCheckout />
    </>
  );
}
