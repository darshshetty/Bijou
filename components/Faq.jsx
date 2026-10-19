export default function Faq({ items, title = 'FAQ' }) {
  return (
    <section className="wrap section faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="h2 center" style={{ marginBottom: 24 }}>{title}</h2>
      <div>
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
