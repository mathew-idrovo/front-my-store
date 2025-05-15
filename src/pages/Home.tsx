import ProductCard from '@/components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { Link } from 'react-router-dom'

export default function Home() {
  const { data: products, isLoading } = useProducts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-teal-800">
          Catálogo de Productos
        </h1>
        <Link to="/products">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors">
            Administrar Productos
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse w-10 h-10 rounded-full bg-teal-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
