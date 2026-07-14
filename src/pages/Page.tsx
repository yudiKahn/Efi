interface PageProps {
  title: string
  description: string
}

function Page({ title, description }: PageProps) {
  return (
    <main className="collection-layout">
      <section className="collection-intro">
        <h1 className="display-type">{title}</h1>
        <p>{description}</p>
      </section>

      <section className="collection-grid">
        {[1, 2, 3].map((item) => (
          <article key={item} className="collection-card">
            <span className="collection-card__index" aria-hidden="true">0{item}</span>
            <h3>Feature {item}</h3>
            <p>
              Discover the finest collection of {title.toLowerCase()} items crafted with care and attention to detail.
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Page
