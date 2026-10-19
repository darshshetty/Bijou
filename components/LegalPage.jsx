export default function LegalPage({ doc }) {
  return (
    <main className="wrap page">
      <article className="prose legal">
        <h1 className="page-title">{doc.title}</h1>
        <p className="small muted">Last updated {doc.updated}</p>
        {doc.intro.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        {doc.sections.map((s) => (
          <section key={s.h} className="stack" style={{ gap: 12 }}>
            <h2>{s.h}</h2>
            {s.body.map((b, i) => (b.list
              ? <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
              : <p key={i} className="muted">{b}</p>))}
          </section>
        ))}
      </article>
    </main>
  );
}
