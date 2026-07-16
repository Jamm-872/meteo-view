import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Search, CloudSun,
  BarChart2, Star, Settings
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/search', icon: Search, label: 'Buscar' },
  { to: '/forecast', icon: CloudSun, label: 'Pronóstico' },
  { to: '/statistics', icon: BarChart2, label: 'Estadísticas' },
  { to: '/favorites', icon: Star, label: 'Favoritos' },
  { to: '/settings', icon: Settings, label: 'Configuración' },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-4 gap-1">
        <h1 className="text-lg font-bold text-blue-400 mb-6 px-2">METEO-VIEW</h1>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout