import { useState } from 'react'
import { useDeleteProduct, useProducts } from '../hooks/useProducts'
import ProductForm from '../components/forms/ProductForm'

import { Modal } from '@/components/Modal'
import { Plus } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export default function Products() {
  const { data: products, isLoading } = useProducts()
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-teal-800">
          Administrar Productos
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} /> Crear Producto
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse w-10 h-10 rounded-full bg-teal-400"></div>
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">No hay productos disponibles</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Crear el primer producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Modal
        title="Crear Producto"
        open={showCreateModal}
        describe="Añade un nuevo producto a tu catalogo"
        onOpenChange={setShowCreateModal}
      >
        <ProductForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  )
}
