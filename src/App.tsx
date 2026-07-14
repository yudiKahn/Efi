import './App.css'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-[#f5efe7] text-slate-800">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Curated essentials</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Quiet luxury for everyday living.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A calm, minimalist studio shaped by thoughtful details and beautifully made pieces.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700">
              Explore pieces
            </a>
            <a href="#" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              View lookbook
            </a>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Timeless forms', text: 'Soft silhouettes and sculptural shape in tactile finishes.' },
            { title: 'Made to last', text: 'Thoughtful materials selected for warmth, comfort, and longevity.' },
            { title: 'Elevated details', text: 'A refined palette that brings understated elegance to any room.' },
          ].map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>
      </main>

      <a
        href="https://wa.me/972528977603"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition hover:scale-105"
        aria-label="Contact via WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.9 14.6c-.3-.1-1.8-.9-2-.9-.2-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-1-.9-1.7-2-1.9-2.3-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.8.7-.8 1.8 0 1.1.8 2.1 1 2.3.1.2 1.7 2.7 4.2 3.8.6.2 1.1.3 1.5.4.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.1-.4-.2Z" />
          <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.8-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
        </svg>
      </a>
    </div>
  )
}

export default App
