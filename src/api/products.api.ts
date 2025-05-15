import axios from 'axios'
import type { Product } from '../types/product'

const API_URL = 'http://localhost:3000/api/v1/products'

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
) => axios.put(`${API_URL}/${id}`, data)

export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`)
