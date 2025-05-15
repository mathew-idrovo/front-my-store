import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
