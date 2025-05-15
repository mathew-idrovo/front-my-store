import type { Category } from './category'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category?: Category
  categoryId: number
  createdAt: string
}
