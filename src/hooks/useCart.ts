import { useEffect, useState } from 'react'
import { cartService, type CartItems } from '../services/CartService'

type CartState = {
  items: CartItems
  count: number
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    items: cartService.getItems(),
    count: cartService.getCount(),
  })

  useEffect(() => {
    const unsubscribe = cartService.subscribe(() => {
      setState({
        items: cartService.getItems(),
        count: cartService.getCount(),
      })
    })

    return unsubscribe
  }, [])

  return {
    items: state.items,
    count: state.count,
    getQuantity: (productId: string) => state.items[productId] ?? 0,
    addToCart: (productId: string, quantity?: number) => cartService.add(productId, quantity),
    updateQuantity: (productId: string, quantity: number) => cartService.update(productId, quantity),
    removeFromCart: (productId: string) => cartService.remove(productId),
    clearCart: () => cartService.clear(),
  }
}
