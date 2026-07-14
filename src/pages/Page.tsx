interface PageProps {
  title: string
  description: string
}

function Page({ title, description }: PageProps) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:p-12">
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <article key={item} className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Feature {item}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Discover the finest collection of {title.toLowerCase()} items crafted with care and attention to detail.
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Page
