import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'
import { getNavigationIcon } from '../utils/navigationIcons'

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

  const title = locale === 'en' ? 'MEGILLA' : 'מגילה';

  return (
    <Page
      title={title}
      iconPath={getNavigationIcon('/megilla')}
      products={megillaProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
