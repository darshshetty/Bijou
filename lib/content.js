// Copy that appears on more than one page lives here so it stays consistent.

export const CONTACT = {
  email: 'help@bijouai.co',
  phone: '(972) 890-4391',
  phoneHref: 'tel:+19728904391',
  hours: '10am–6pm EST',
};

export const POLICY = {
  returns: 'Returns: 30 days from delivery, excluding custom-designed jewelry. Return shipping is paid by the customer.',
  resizing: 'Resizing is not included.',
  warranty: 'Warranty: 60 days against manufacturing defects only; accidental damage is not covered.',
};

export const HOME_FAQS = [
  ['What does the $100 model fee cover?', 'Your 3D-printed model and shipping to your door, so you can see it and try it on. The $100 is separate from your ring and isn’t credited toward its price.'],
  ['Can I change my design after I see the model?', 'Yes. Revise your design online as many times as you like, and book up to three complimentary design sessions with our team. Each new 3D-printed model is $100.'],
  ['Do I need the design session?', 'No, it’s optional. Design entirely online, or book up to three complimentary one-hour sessions with our team whenever you want help.'],
  ['How do I pay for my ring?', 'In full at checkout, once you approve your final design. Crafting begins as soon as your payment is confirmed.'],
  ['What if it isn’t right?', `${POLICY.returns} ${POLICY.resizing} ${POLICY.warranty}`],
  ['How long does crafting take?', '3–5 weeks after you approve your final design.'],
];

export const CONTACT_FAQS = [
  ['How does the Bijou process work?', 'Design your ring online or start from a photo, refine it with our team if you like, then hold a 3D-printed model before anything is made. Once you approve, we craft your ring with a lab-grown diamond.'],
  ['What does the $100 model fee cover?', HOME_FAQS[0][1]],
  ['How long does the 3D model take to arrive?', 'It ships within 3 business days. Delivery time then depends on the carrier and your ZIP code.'],
  ['Can I change my design after I see the model?', HOME_FAQS[1][1]],
  ['How do I pay for my ring?', HOME_FAQS[3][1]],
  ['How long does crafting take?', '3–5 weeks after you approve your final design.'],
  ['Are your diamonds certified?', 'Yes. Every center stone is lab-grown and comes with an IGI grading report.'],
  ['What is your return policy?', 'Returns are accepted within 30 days of delivery, excluding custom-designed jewelry. Return shipping is paid by the customer.'],
  ['Do you offer resizing?', 'Resizing is not included. Our 3D model lets you check the fit before your ring is made, so it’s right the first time.'],
  ['What does the warranty cover?', '60 days against manufacturing defects only. Accidental damage is not covered.'],
];
