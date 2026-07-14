import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import siteContent from './content/siteContent.json'
import seferImage from './assets/sefer.png'

type Locale = 'en' | 'he'

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const content = siteContent[locale]

  return (
    <div className="min-h-screen bg-[#f5efe7] text-slate-800">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <div
            className="relative min-h-[480px] bg-cover bg-center bg-no-repeat flex flex-wrap content-end "
            style={{ backgroundImage: `url(${seferImage})`, backgroundSize: 'contain' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="relative flex h-full justify-center mx-auto px-6 pb-10 text-center sm:px-10 sm:pb-14">
              <div className="max-w-2xl text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-white/80">{content.heroEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  {content.heroTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg">
                  {content.heroDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {content.cards.map((item: { title: string; text: string }) => (
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
        aria-label={content.whatsappAria}
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
