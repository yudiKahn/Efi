import type { Locale } from '../models/enums'
import Page from './Page'

function Mezuza({ locale }: { locale: Locale}) {
  return (
    <Page
      title={locale === 'en' ? 'Mezuza' : 'מזוזה'}
      description={locale === 'en' ? 'A mezuzah is a small parchment scroll placed on doorposts. Explore our elegant collection of mezuzah cases and scrolls.' : 'מזוזה היא כריכה עתיקה קטנה הממוקמת על מזוזות הדלתות. גלו את אוסף המזוזות והכרכים האלגנטיים שלנו.'}
    />
  )
}

export default Mezuza
