import type { Locale } from '../models/enums'
import Page from './Page'

function Megilla({ locale }: { locale: Locale }) {
  return (
    <Page
      title={locale === 'en' ? 'Megilla' : 'מגילה'}
      description={locale === 'en' ? 'The Megilla (scroll) is read during Purim and other holidays. Browse our collection of beautifully crafted megilla scrolls.' : 'המגילה (כריכה) נקראת בפורים וחגים אחרים. עיין באוסף הכריכות המגילה היפות שלנו.'}
    />
  )
}

export default Megilla
