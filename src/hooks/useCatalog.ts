import { useState, useEffect } from 'react'
import { catalogService } from '../services/CatalogService'
import type { Product } from '../services/CatalogService'

export interface CatalogState {
  products: Product[]
  headers: string[]
  loading: boolean
  error: string | null
}

export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({
    products: catalogService.getProducts(),
    headers: catalogService.getHeaders(),
    loading: catalogService.isLoading(),
    error: catalogService.getError()
  })

  useEffect(() => {
    // Subscribe to catalog changes
    const unsubscribe = catalogService.subscribe(() => {
      setState({
        products: catalogService.getProducts(),
        headers: catalogService.getHeaders(),
        loading: catalogService.isLoading(),
        error: catalogService.getError()
      })
    })

    // Double-check if we need to load or kick off fetch
    catalogService.init()

    return unsubscribe
  }, [])

  return state
}
