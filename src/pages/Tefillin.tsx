import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'

interface TefillinProps {
  locale: Locale
}

export default function Tefillin({ locale }: TefillinProps) {
  const { products, headers, loading, error } = useCatalog()

  // Filter by category 'tefillin' (case-insensitive)
  const tefillinProducts = products.filter(item => {
    const cat = item.category || ''
    return cat.toLowerCase().includes('tefillin') || cat.toLowerCase().includes('תפילין')
  })

  const title = locale === 'en' ? 'TEFILLIN' : 'תפילין'
  const description = locale === 'en'
    ? 'Tefillin are small leather boxes worn during prayer containing Torah passages. Discover our premium tefillin collection.'
    : 'תפילין הן קופסאות עור קטנות שלובשים בעת התפילה המכילות קטעי תורה. גלו את אוסף התפילין הפרימיום שלנו.'

  return (
    <Page
      title={title}
      description={description}
      products={tefillinProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
