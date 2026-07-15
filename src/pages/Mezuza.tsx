import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'

interface MezuzaProps {
  locale: Locale
}

export default function Mezuza({ locale }: MezuzaProps) {
  const { products, headers, loading, error } = useCatalog()

  // Filter by category 'mezuza' (case-insensitive)
  const mezuzaProducts = products.filter(item => {
    const cat = item.category || ''
    return cat.toLowerCase().includes('mezuza') || cat.toLowerCase().includes('מזוזה')
  })

  const title = locale === 'en' ? 'MEZUZOS' : 'מזוזות'
  const description = locale === 'en' 
    ? 'A mezuzah is a small parchment scroll placed on doorposts. Explore our elegant collection of mezuzah cases and scrolls.' 
    : 'מזוזה היא כריכה עתיקה קטנה הממוקמת על מזוזות הדלתות. גלו את אוסף המזוזות והכרכים האלגנטיים שלנו.'

  return (
    <Page
      title={title}
      description={description}
      products={mezuzaProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
