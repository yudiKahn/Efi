import { Link } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import { useCart } from '../hooks/useCart'
import { useCatalog } from '../hooks/useCatalog'
import type { Locale } from '../models/enums'

interface CartProps {
  locale: Locale
}

export default function Cart({ locale }: CartProps) {
  const content = siteContent[locale] as Record<string, unknown>
  const { products, loading } = useCatalog()
  const { items, count, updateQuantity, removeFromCart, clearCart } = useCart()

  const cartEntries = Object.entries(items)
    .map(([productId, quantity]) => ({
      productId,
      quantity,
      product: products.find((entry) => entry.id === productId),
    }))
    .filter((entry) => entry.product)

  const totalItemsText = String(content.cartItemsCount || '{count} items in cart').replace('{count}', count.toString())

  return (
    <main className="collection-layout">
      <section className="collection-intro">
        <h1 className="display-type">{String(content.cartTitle)}</h1>
        <p>{totalItemsText}</p>
      </section>

      {loading && cartEntries.length === 0 ? (
        <div className="catalog-loading-container">
          <div className="spinner"></div>
          <p>{String(content.loading)}</p>
        </div>
      ) : count === 0 ? (
        <div className="catalog-empty-container">
          <p>{String(content.cartEmpty)}</p>
          <Link to="/" className="cart-action-button">
            {String(content.cartContinueShopping)}
          </Link>
        </div>
      ) : (
        <section className="cart-page">
          <div className="cart-page__actions">
            <button type="button" onClick={clearCart} className="cart-secondary-button">
              {String(content.cartClear)}
            </button>
          </div>

          <div className="cart-list">
            {cartEntries.map(({ productId, quantity, product }) => {
              if (!product) return null

              return (
                <article key={productId} className="cart-item">
                  <div className="cart-item__media">
                    {product.image ? (
                      <img src={product.image} alt={product.name || String(content.unnamedItem)} className="cart-item__image" />
                    ) : (
                      <div className="product-card__image-placeholder cart-item__image-placeholder">
                        <span className="placeholder-text">{String(content.noImage)}</span>
                      </div>
                    )}
                  </div>

                  <div className="cart-item__content">
                    <div>
                      <h2 className="cart-item__title">{product.name || String(content.unnamedItem)}</h2>
                      <p className="cart-item__price">{product.price || ''}</p>
                    </div>

                    <div className="cart-item__controls">
                      <label className="cart-item__label">
                        <span>{String(content.cartQuantity)}</span>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(event) => updateQuantity(productId, Number(event.target.value))}
                          className="cart-item__quantity-input"
                        />
                      </label>

                      <button type="button" onClick={() => removeFromCart(productId)} className="cart-remove-button">
                        {String(content.cartRemove)}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
