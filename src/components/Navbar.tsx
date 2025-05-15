'use client'

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const routes = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/categories', label: 'Categorías' },
    { path: '/clients', label: 'Clientes' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            ProductApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`transition-colors hover:text-teal-200 ${
                  isActive(route.path)
                    ? 'font-semibold text-white'
                    : 'text-teal-100'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pb-4 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`block py-2 px-4 rounded transition-colors ${
                  isActive(route.path)
                    ? 'bg-teal-700 text-white'
                    : 'text-teal-100 hover:bg-teal-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
