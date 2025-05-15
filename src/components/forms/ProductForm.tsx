import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Product } from '../../types/product'
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Nombre obligatorio'),
  description: z
    .string()
    .min(10, 'Descripción obligatoria y min 10 caracteres'),
  price: z.number().min(10, 'Precio inválido, valor min 10'),
  image: z.string().url('URL inválida'),
  categoryId: z.number(),
})

type FormData = z.infer<typeof schema>

interface Props {
  initialData?: Product
  onSuccess?: () => void
}

export default function ProductForm({ initialData, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      image: '',
      categoryId: 1,
    },
  })

  const { data: categories, isLoading: loadingCategories } = useCategories()
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()

  const onSubmit = async (data: FormData) => {
    if (initialData) {
      await updateMutation.mutateAsync({ id: initialData.id, data })
    } else {
      await createMutation.mutateAsync(data)
    }
    reset()
    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          {...register('name')}
          placeholder="Nombre del producto"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          {...register('description')}
          placeholder="Descripción detallada del producto"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Precio
        </label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          placeholder="Precio"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de la imagen
        </label>
        <input
          {...register('image')}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        {loadingCategories ? (
          <div className="animate-pulse h-10 bg-gray-200 rounded-md"></div>
        ) : (
          <select
            {...register('categoryId', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting
          ? 'Guardando...'
          : initialData
          ? 'Actualizar producto'
          : 'Crear producto'}
      </button>
    </form>
  )
}
