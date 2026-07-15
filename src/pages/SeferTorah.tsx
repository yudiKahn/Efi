import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'

interface SeferTorahProps {
  locale: Locale
}

export default function SeferTorah({ locale }: SeferTorahProps) {
  const { products, headers, loading, error } = useCatalog()

  // Filter by category 'sefer-torah' (case-insensitive)
  const seferProducts = products.filter(item => {
    const cat = item.category || ''
    return (
      cat.toLowerCase().includes('sefer-torah') ||
      cat.toLowerCase().includes('sefer torah') ||
      cat.toLowerCase().includes('ספר תורה')
    )
  })

  const title = locale === 'en' ? 'SEFER TORAH' : 'ספר תורה'
  const description = locale === 'en'
    ? 'The Sefer Torah is the holiest object in Jewish life. Explore our collection of beautifully written Torah scrolls.'
    : 'ספר התורה הוא החפץ הקדוש ביותר בחיי היהודים. גלו את אוסף ספרי התורה הכתובים בצורה יפהפייה.'

  return (
    <Page
      title={title}
      description={description}
      products={seferProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
