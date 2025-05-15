import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products.api'
import type { Product } from '../types/product'

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getProducts().then((res) => res.data),
  })

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id).then((res) => res.data),
    enabled: !!id,
  })

export const useCreateProduct = (): UseMutationResult<
  Product,
  Error,
  Omit<Product, 'id' | 'createdAt'>
> => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = (): UseMutationResult<
  Product,
  Error,
  { id: number; data: Omit<Product, 'id' | 'createdAt'> }
> => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateProduct(id, data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = (): UseMutationResult<any, Error, number> => {
  const client = useQueryClient()
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => deleteProduct(id).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['products'] }),
  })
}
