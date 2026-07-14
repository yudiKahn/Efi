import { useState } from 'react'
import { Link } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import type { Locale } from '../models/enums'

function Header({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (value: Locale) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const content = siteContent[locale]

  return (
    <header className="relative z-[70] isolate border-b border-slate-300/80 bg-[#f5efe7]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative flex w-24 items-center justify-start">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-slate-300 bg-white/70 p-2.5 transition hover:border-slate-400 hover:bg-white"
            aria-label={content.menuAria}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute left-4 top-16 z-[80] w-48 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              {content.menuLinks.map((link: { label: string; path: string }) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex gap-2 border-t border-slate-200 pt-3">
                <button
                  type="button"
                  onClick={() => onLocaleChange('en')}
                  className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                    locale === 'en' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLocaleChange('he')}
                  className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                    locale === 'he' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  עב
                </button>
              </div>
            </div>
          )}
        </div>

        <h1 className="text-center text-lg font-semibold uppercase tracking-[0.35em] text-slate-900">
          {content.brandName}
        </h1>

        <button
          type="button"
          className="flex items-center justify-end rounded-full border border-slate-300 bg-white/70 p-2.5 transition hover:border-slate-400 hover:bg-white"
          aria-label={content.cartAria}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 4h2l2.3 9.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L17 6H7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="19" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="17" cy="19" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
