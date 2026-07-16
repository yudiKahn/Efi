import type { Locale } from '../models/enums'
import Page from './Page'
import { useCatalog } from '../hooks/useCatalog'
import { getNavigationIcon } from '../utils/navigationIcons'

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

  const title = locale === 'en' ? 'TEFILLIN' : 'תפילין';

  return (
    <Page
      title={title}
      iconPath={getNavigationIcon('/tefillin')}
      products={tefillinProducts}
      headers={headers}
      loading={loading}
      error={error}
      locale={locale}
    />
  )
}
