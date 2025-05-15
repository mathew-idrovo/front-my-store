import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'

import type { Product } from '../types/product'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../api/categories.api'

export const useCategories = () =>
  useQuery<Product[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories().then((res) => res.data),
  })

export const useCategory = (id: number) =>
  useQuery<Product>({
    queryKey: ['category', id],
    queryFn: () => getCategory(id).then((res) => res.data),
    enabled: !!id,
  })

export const useCreateCategory = (): UseMutationResult<
  Product,
  Error,
  Omit<Product, 'id' | 'createdAt'>
> => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategory = (): UseMutationResult<
  Product,
  Error,
  { id: number; data: Omit<Product, 'id' | 'createdAt'> }
> => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateCategory(id, data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useDeleteCategory = (): UseMutationResult<any, Error, number> => {
  const client = useQueryClient()
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => deleteCategory(id).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['categories'] }),
  })
}
