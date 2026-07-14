import type { Locale } from '../models/enums'
import Page from './Page'

function SeferTorah({ locale }: { locale: Locale }) {
  return (
    <Page
      title={locale === 'en' ? 'Sefer Torah' : 'ספר תורה'}
      description={locale === 'en' ? 'The Sefer Torah is the most sacred text in Judaism. Explore Torah-related items and accessories in our collection.' : 'ספר התורה הוא הטקסט הקדוש ביותר ביהדות. גלו פריטים וספקות הקשורים לתורה באוסף שלנו.'}
    />
  )
}

export default SeferTorah
