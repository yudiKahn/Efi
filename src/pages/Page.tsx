import { useState } from 'react'
import type { Locale } from '../models/enums'
import type { Product } from '../services/CatalogService'
import siteContent from '../content/siteContent.json'
import { useCart } from '../hooks/useCart'

interface PageProps {
  title: string
  iconPath?: string
  products: Product[]
  headers: string[]
  loading: boolean
  error: string | null
  locale: Locale
}

function Page({ title, iconPath, products, headers, loading, error, locale }: PageProps) {
  const [sortBy, setSortBy] = useState<string>('default')
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid')
  const { addToCart, getQuantity } = useCart()

  // Read translations from JSON content
  const content = siteContent[locale] as Record<string, any>

  // Sorting logic
  const getSortedProducts = () => {
    const sorted = [...products]
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/[^\d.]/g, '')) || 0
        const priceB = parseFloat((b.price || '0').replace(/[^\d.]/g, '')) || 0
        return priceA - priceB
      })
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/[^\d.]/g, '')) || 0
        const priceB = parseFloat((b.price || '0').replace(/[^\d.]/g, '')) || 0
        return priceB - priceA
      })
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    }
    return sorted
  }

  const sortedProducts = getSortedProducts()
  const itemsCountText = (content.itemsCount || '{count} items').replace('{count}', products.length.toString())

  return (
    <main className="collection-layout">
      {/* Dynamic Title and Description */}
      <section className="collection-intro">
        <h1 className="display-type collection-title">
          {iconPath && <img src={iconPath} alt="" className="collection-title__icon" aria-hidden="true" />}
          <span>{title}</span>
        </h1>
      </section>

      {/* Control bar */}
      <section className="collection-controls">
        <div className="controls-left">
          {/* Layout toggles */}
          <button 
            type="button" 
            onClick={() => setViewLayout('grid')} 
            className={`control-btn ${viewLayout === 'grid' ? 'is-active' : ''}`}
            title={content.layoutGrid}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => setViewLayout('table')} 
            className={`control-btn ${viewLayout === 'table' ? 'is-active' : ''}`}
            title={content.layoutTable}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10h18M3 14h18M3 18h18M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </button>
          <span className="items-count-label">{itemsCountText}</span>
        </div>

        <div className="controls-right">
          <div className="sort-wrapper">
            <span className="sort-label">{content.sortBy}</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">{content.sortDefault}</option>
              <option value="price-asc">{content.sortPriceAsc}</option>
              <option value="price-desc">{content.sortPriceDesc}</option>
              <option value="name-asc">{content.sortNameAsc}</option>
            </select>
          </div>
          {/* <button type="button" className="filter-btn">
            {content.filter}
          </button> */}
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="catalog-loading-container">
          <div className="spinner"></div>
          <p>{content.loading}</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="catalog-error-container">
          <svg viewBox="0 0 24 24" className="error-icon h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{content.errorMsg}</p>
          <button 
            type="button" 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            {content.retryBtn}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="catalog-empty-container">
          <p>{content.emptyState}</p>
          <div className="sheet-columns-guide">
            <p><strong>{content.columnsFound}</strong></p>
            <div className="columns-badges">
              {headers.map(h => (
                <span key={h} className="col-badge">{h}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Display */}
      {!loading && !error && products.length > 0 && (
        <>
          {viewLayout === 'grid' ? (
            <div className="catalog-grid-layout">
              {sortedProducts.map((item, idx) => {
                const priceVal = item.price || '0'
                const displayPrice = priceVal.toLowerCase().includes('ils') || priceVal.toLowerCase().includes('nis') || priceVal.includes('₪')
                  ? priceVal
                  : `${priceVal}.00 NIS`

                return (
                  <article key={idx} className="catalog-product-card">
                    <div className="product-card__image-container">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name || 'Product'} 
                          className="product-card__image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="product-card__image-placeholder">
                          <svg viewBox="0 0 24 24" className="placeholder-icon h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="placeholder-text">{content.noImage}</span>
                        </div>
                      )}
                    </div>
                    <div className="product-card__details">
                      <h3 className="product-card__name">{item.name || content.unnamedItem}</h3>
                      <p className="product-card__price">{displayPrice}</p>
                      <button
                        type="button"
                        className="cart-action-button"
                        onClick={() => addToCart(item.id)}
                        disabled={!item.id}
                      >
                        {item.id
                          ? getQuantity(item.id) > 0
                            ? `${content.addToCart} (${getQuantity(item.id)})`
                            : content.addToCart
                          : content.unavailable}
                      </button>
                      
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            /* Table View */
            <div className="catalog-table-wrapper">
              <table className="catalog-table">
                <thead>
                  <tr>
                    {headers.map(header => (
                      <th key={header}>{header.toUpperCase()}</th>
                    ))}
                    <th>{content.cartColumn}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((item, idx) => (
                    <tr key={idx}>
                      {headers.map(header => {
                        const val = item[header] || ''
                        if (header === 'image') {
                          return (
                            <td key={header} className="table-image-cell">
                              {val ? (
                                <img src={val} alt="Product thumb" className="table-thumb" />
                              ) : (
                                <span className="table-no-image">{content.noImage}</span>
                              )}
                            </td>
                          )
                        }
                        return <td key={header}>{val}</td>
                      })}
                      <td>
                        <button
                          type="button"
                          className="cart-table-button"
                          onClick={() => addToCart(item.id)}
                          disabled={!item.id}
                        >
                          {item.id
                            ? getQuantity(item.id) > 0
                              ? `${content.addToCart} (${getQuantity(item.id)})`
                              : content.addToCart
                            : content.unavailable}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default Page
