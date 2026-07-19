import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import siteContent from './content/siteContent.json'
import seferImage from './assets/sefer.png'
import type { Locale } from './models/enums'
import { SeoManager } from './services/SeoManager'
import Mezuza from './pages/Mezuza'
import Tefillin from './pages/Tefillin'
import SeferTorah from './pages/SeferTorah'
import Megilla from './pages/Megilla'
import Cart from './pages/Cart'
import { getNavigationIcon } from './utils/navigationIcons'

function AppContent({ locale, setLocale }: { locale: Locale; setLocale: (value: Locale) => void }) {
  const location = useLocation()
  const content = siteContent[locale]
  const sharedContent = siteContent.shared
  const homeLinks = [...content.menuLinks, { label: content.cartTitle, path: '/cart' }]
  const categoryLinks = content.menuLinks.filter((link) =>
    ['/sefer-torah', '/mezuza', '/tefillin', '/megilla'].includes(link.path)
  )
  const categoryDescriptions = content.homeCategoryDescriptions as Record<string, string>
  const scrollToCategories = () => {
    document.getElementById('home-category-grid')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    SeoManager.apply(locale, location.pathname)
  }, [locale, location.pathname])

  return (
    <div className="site-shell" dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <Header locale={locale} onLocaleChange={setLocale} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="home-layout">
              <section className="home-hero">
                <div
                  className="home-hero__image"
                  style={{ backgroundImage: `url(${seferImage})` }}
                  role="img"
                  aria-label={content.brandName}
                >
                  <div className="home-hero__copy">
                    <h2 className="display-type home-hero__title">{content.brandName}</h2>
                    <div className="home-hero__ornament" aria-hidden="true">♕</div>
                    <p className="home-hero__description">{content.cards[0]?.title}</p>
                    <button type="button" className="home-hero__cta" onClick={scrollToCategories}>
                      {content.ctaPrimary}
                      <span aria-hidden="true">&larr;</span>
                    </button>
                  </div>
                </div>
              </section>

              <section id="home-category-grid" className="home-category-grid" aria-label={content.homeCategoryAria}>
                {categoryLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="home-category-card">
                    {getNavigationIcon(link.path) && (
                      <img src={getNavigationIcon(link.path)} alt="" className="home-category-card__icon" aria-hidden="true" />
                    )}
                    <h3>{link.label}</h3>
                    <p>{categoryDescriptions[link.path]}</p>
                    <span className="home-category-card__arrow" aria-hidden="true">&larr;</span>
                  </Link>
                ))}
              </section>




              <section className={`feature-grid ${content.cards.length === 1 ? 'is-single' : ''}`}>
                {content.cards.map((item: { title: string; text: string }) => (
                  <article key={item.title} className="feature-card">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </section>

              <footer className="home-footer">
                <div className="home-footer__brand">
                  <p className="display-type">{content.brandName}</p>
                  <div className="home-footer__ornament" aria-hidden="true">♕</div>
                  <span>{content.brandSubtitle}</span>
                </div>
                <div>
                  <h3>{content.homeFooterQuickLinksTitle}</h3>
                  {homeLinks.filter((link) => link.path.length > 1).slice(0, 5).map((link) => (
                    <Link key={link.path} to={link.path}>{link.label}</Link>
                  ))}
                </div>
                <div>
                  <h3>{content.homeFooterContactTitle}</h3>
                  <a href={`tel:${sharedContent.contactPhone.replace(/-/g, '')}`}>{sharedContent.contactPhone}</a>
                  <a href={`mailto:${sharedContent.contactEmail}`}>{sharedContent.contactEmail}</a>
                  <span>{content.homeFooterLocation}</span>
                </div>
                <div>
                  <h3>{content.homeFooterHoursTitle}</h3>
                  {content.homeFooterHours.map((hours) => (
                    <span key={hours}>{hours}</span>
                  ))}
                </div>
              </footer>
            </main>
          }
        />
        <Route path="/mezuza" element={<Mezuza locale={locale} />} />
        <Route path="/tefillin" element={<Tefillin locale={locale} />} />
        <Route path="/sefer-torah" element={<SeferTorah locale={locale} />} />
        <Route path="/megilla" element={<Megilla locale={locale} />} />
        <Route path="/cart" element={<Cart locale={locale} />} />
      </Routes>

      <a
        href={sharedContent.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
        aria-label={content.whatsappAria}
      >
        <svg viewBox="0 0 30 30" className="m-2 h-full w-full" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
        </svg>
      </a>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>('he')

  return (
    <BrowserRouter basename="/Efi/">
      <AppContent locale={locale} setLocale={setLocale} />
    </BrowserRouter>
  )
}

export default App
