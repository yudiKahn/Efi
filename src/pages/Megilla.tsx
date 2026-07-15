import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'

interface MegillaProps {
  locale: Locale
}

export default function Megilla({ locale }: MegillaProps) {
  const { products, headers, loading, error } = useCatalog()

  // Filter by category 'megilla' (case-insensitive)
  const megillaProducts = products.filter(item => {
    const cat = item.category || ''
    return cat.toLowerCase().includes('megilla') || cat.toLowerCase().includes('מגילה')
  })

  const title = locale === 'en' ? 'MEGILLA' : 'מגילה'
  const description = locale === 'en'
    ? 'A Megillah is a parchment scroll containing scripture, most commonly the Book of Esther. Explore our collection.'
    : 'מגילה היא כרך קלף המכיל כתבי קודש, בדרך כלל מגילת אסתר. גלו את האוסף שלנו.'

  return (
    <Page
      title={title}
      description={description}
      products={megillaProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
