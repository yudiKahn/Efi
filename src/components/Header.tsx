import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import type { Locale } from '../models/enums'

function Header({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (value: Locale) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const content = siteContent[locale]

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__menu">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="icon-button mobile-menu-button"
            aria-label={content.menuAria}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="mobile-menu-panel">
              {content.menuLinks.map((link: { label: string; path: string }) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="mobile-menu-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mobile-locale-row">
                <button
                  type="button"
                  onClick={() => onLocaleChange('en')}
                  className={`locale-button ${locale === 'en' ? 'is-active' : ''}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLocaleChange('he')}
                  className={`locale-button ${locale === 'he' ? 'is-active' : ''}`}
                >
                  עב
                </button>
              </div>
            </div>
          )}
        </div>

        <Link to="/" className="site-brand">{content.brandName}</Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {content.menuLinks.map((link: { label: string; path: string }) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `desktop-nav__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__utilities">
          <div className="desktop-locales" aria-label={content.localeLabel}>
            <button type="button" onClick={() => onLocaleChange('en')} className={locale === 'en' ? 'is-active' : ''}>EN</button>
            <span>/</span>
            <button type="button" onClick={() => onLocaleChange('he')} className={locale === 'he' ? 'is-active' : ''}>עב</button>
          </div>
          <button type="button" className="icon-button" aria-label={content.cartAria}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 4h2l2.3 9.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L17 6H7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="19" r="1.25" fill="currentColor" stroke="none" />
              <circle cx="17" cy="19" r="1.25" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
