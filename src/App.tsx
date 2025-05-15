import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import { Categories } from './pages/Categories'
import Clientes from './pages/Clientes'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/clients" element={<Clientes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
