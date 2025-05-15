import { NavLink } from 'react-router-dom'
const base = 'px-4 py-2 font-medium hover:bg-blue-600 hover:text-white rounded'
const active = 'bg-blue-600 text-white'
function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex space-x-4">
      <NavLink
        to="/products"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        Productos
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        Categorías
      </NavLink>
      <NavLink
        to="/clients"
        className={({ isActive }) => `${base} ${isActive ? active : ''}`}
      >
        Clientes
      </NavLink>
    </nav>
  )
}

export default Navbar
