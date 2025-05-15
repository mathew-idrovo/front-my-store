import axios from 'axios'
import type { Product } from '../types/product'
const BASE = import.meta.env.VITE_API_BASE

const API_URL = `${BASE}/products`

export const getProducts = () => axios.get<Product[]>(API_URL)

export const getProduct = (id: number) => axios.get<Product>(`${API_URL}/${id}`)

export const createProduct = async (
  data: Omit<Product, 'id' | 'createdAt'>
): Promise<Product> => {
  const res = await axios.post<Product>(API_URL, data)
  return res.data
}

export const updateProduct = (
  id: number,
  data: Omit<Product, 'id' | 'createdAt'>
) => axios.patch(`${API_URL}/${id}`, data)

export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`)
