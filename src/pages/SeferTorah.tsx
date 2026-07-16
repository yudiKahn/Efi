import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'
import { getNavigationIcon } from '../utils/navigationIcons'

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

  const title = locale === 'en' ? 'SEFER TORAH' : 'ספר תורה';

  return (
    <Page
      title={title}
      iconPath={getNavigationIcon('/sefer-torah')}
      products={seferProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
