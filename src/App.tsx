import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import siteContent from './content/siteContent.json'
import seferImage from './assets/sefer.png'
import type { Locale } from './models/enums'
import Mezuza from './pages/Mezuza'
import Tefillin from './pages/Tefillin'
import SeferTorah from './pages/SeferTorah'
import Megilla from './pages/Megilla'

function AppContent({ locale, setLocale }: { locale: Locale; setLocale: (value: Locale) => void }) {
  const content = siteContent[locale]

  return (
    <div className="min-h-screen bg-[#f5efe7] text-slate-800">
      <Header locale={locale} onLocaleChange={setLocale} />

      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/mezuza" element={<Mezuza locale={locale} />} />
        <Route path="/tefillin" element={<Tefillin locale={locale} />} />
        <Route path="/sefer-torah" element={<SeferTorah locale={locale} />} />
        <Route path="/megilla" element={<Megilla locale={locale} />} />
      </Routes>

      <a
        href="https://wa.me/972528977603"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 transition hover:scale-105"
        aria-label={content.whatsappAria}
      >
        <svg viewBox="0 0 30 30" className="h-full w-full m-2"  fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
        </svg>
      </a>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <BrowserRouter basename="/Efi/">
      <AppContent locale={locale} setLocale={setLocale} />
    </BrowserRouter>
  )
}

export default App
