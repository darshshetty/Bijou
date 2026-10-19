const STEPS = ['Design', 'Designer session (optional)', '3D model · $100', 'Payment & crafting'];

export default function Steps({ current }) {
  return (
    <ol className="steps" aria-label="Your progress">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const state = n < current ? 'is-done' : n === current ? 'is-current' : '';
        return (
          <li key={label} className={state} aria-current={n === current ? 'step' : undefined}>
            <span className="dot" aria-hidden="true">{n < current ? '✓' : n}</span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}
