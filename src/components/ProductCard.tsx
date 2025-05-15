import type { Product } from '../types/product'
import { useDeleteProduct } from '../hooks/useProducts'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Modal } from './Modal'
import ProductForm from './forms/ProductForm'

interface ProductCardProps {
  product: Product
  showActions?: boolean
}

export default function ProductCard({
  product,
  showActions = true,
}: ProductCardProps) {
  const deleteProduct = useDeleteProduct()
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct.mutate(product.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 mb-2">
              {product.category?.name ?? 'Sin categoría'}
            </span>
            <h2 className="font-bold text-lg text-gray-800">{product.name}</h2>
          </div>
          <span className="font-bold text-teal-600">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm"
            >
              <Edit size={16} /> Editar
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm"
            >
              <Trash2 size={16} /> Eliminar
            </button>
          </div>
        )}
      </div>

      {showEditModal && (
        <Modal
          title="Editar Producto"
          open={showEditModal}
          onOpenChange={setShowEditModal}
        >
          <ProductForm
            initialData={product}
            onSuccess={() => setShowEditModal(false)}
          />
        </Modal>
      )}
    </div>
  )
}
