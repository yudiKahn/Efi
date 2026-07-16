export type CartItems = Record<string, number>

class CartService {
  private readonly storageKey = 'efi-cart'
  private items: CartItems = {}
  private listeners: Array<() => void> = []

  constructor() {
    this.items = this.readFromStorage()
  }

  getItems(): CartItems {
    return { ...this.items }
  }

  getQuantity(productId: string): number {
    return this.items[productId] ?? 0
  }

  getCount(): number {
    return Object.values(this.items).reduce((sum, quantity) => sum + quantity, 0)
  }

  add(productId: string, quantity = 1) {
    if (!productId || quantity <= 0) return

    this.items[productId] = (this.items[productId] ?? 0) + quantity
    this.persist()
  }

  update(productId: string, quantity: number) {
    if (!productId) return

    if (quantity <= 0) {
      delete this.items[productId]
    } else {
      this.items[productId] = quantity
    }

    this.persist()
  }

  remove(productId: string) {
    if (!productId || !(productId in this.items)) return

    delete this.items[productId]
    this.persist()
  }

  clear() {
    this.items = {}
    this.persist()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener)

    return () => {
      this.listeners = this.listeners.filter((entry) => entry !== listener)
    }
  }

  private persist() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, JSON.stringify(this.items))
    }

    this.listeners.forEach((listener) => listener())
  }

  private readFromStorage(): CartItems {
    if (typeof window === 'undefined') {
      return {}
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey)
      if (!raw) return {}

      const parsed = JSON.parse(raw) as unknown
      if (!parsed || typeof parsed !== 'object') return {}

      return Object.fromEntries(
        Object.entries(parsed).filter(
          ([key, value]) => Boolean(key) && typeof value === 'number' && value > 0,
        ),
      )
    } catch {
      return {}
    }
  }
}

export const cartService = new CartService()
