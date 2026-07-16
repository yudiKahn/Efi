import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'
import { getNavigationIcon } from '../utils/navigationIcons'

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

  const title = locale === 'en' ? 'MEZUZOS' : 'מזוזות';

  return (
    <Page
      title={title}
      iconPath={getNavigationIcon('/mezuza')}
      products={mezuzaProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
