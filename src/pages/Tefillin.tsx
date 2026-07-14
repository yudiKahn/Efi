import type { Locale } from '../models/enums'
import Page from './Page'

function Tefillin({ locale }: { locale: Locale }) {
  return (
    <Page
      title={locale === 'en' ? 'Tefillin' : 'תפילין'}
      description={locale === 'en' ? 'Tefillin are small leather boxes worn during prayer containing Torah passages. Discover our premium tefillin collection.' : 'תפילין הן קופסאות עור קטנות שלובשים בעת התפילה המכילות קטעי תורה. גלו את אוסף התפילין הפרימיום שלנו.'}
    />
  )
}

export default Tefillin
