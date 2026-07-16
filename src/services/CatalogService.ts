import { parseCSV } from '../utils/csvParser'

export interface Product {
  id: string
  name: string
  image: string
  price: string
  category: string
  [key: string]: string
}

class CatalogService {
  private csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfg4K0Oi7eLNYz5iMtHywMlo4Q3_yAwWm1Q27EYkJAWEmrvN5IBjjchMUM8TbGvL-QyF8tCPloPHfh/pub?output=csv'
  private products: Product[] = []
  private headers: string[] = []
  private loading = true
  private error: string | null = null
  private listeners: (() => void)[] = []
  private fetchPromise: Promise<Product[]> | null = null

  constructor() {
    // Proactively start fetching on service load
    this.init()
  }

  public init() {
    if (this.fetchPromise) {
      return this.fetchPromise
    }

    this.loading = true
    this.error = null

    this.fetchPromise = fetch(this.csvUrl + '&t=' + new Date().getTime())
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch CSV data')
        return res.text()
      })
      .then(text => {
        const parsed = parseCSV(text) as Product[]
        this.products = parsed
        
        if (parsed.length > 0) {
          this.headers = Object.keys(parsed[0])
        } else {
          // If no rows are parsed, check for headers in the first line of CSV text
          const firstLine = text.split(/\r?\n/)[0]
          if (firstLine) {
            this.headers = firstLine.split(',').map(h => h.trim().toLowerCase())
          }
        }
        
        this.loading = false
        this.notifyListeners()
        return this.products
      })
      .catch(err => {
        console.error('CatalogService fetch error:', err)
        this.error = err.message || 'Error fetching CSV catalog'
        this.loading = false
        this.notifyListeners()
        return []
      })

    return this.fetchPromise
  }

  public getProducts(): Product[] {
    return this.products
  }

  public getHeaders(): string[] {
    return this.headers
  }

  public isLoading(): boolean {
    return this.loading
  }

  public getError(): string | null {
    return this.error
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(l => l())
  }
}

export const catalogService = new CatalogService()
