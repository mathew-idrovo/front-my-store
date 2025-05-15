import { Route, Routes } from 'react-router-dom'
import './App.css'

import Products from './pages/Products'
import { Categories } from './pages/Categories'
import Clientes from './pages/Clientes'
import Layout from './Layout'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/clients" element={<Clientes />} />
      </Route>
    </Routes>
  )
}

export default App
