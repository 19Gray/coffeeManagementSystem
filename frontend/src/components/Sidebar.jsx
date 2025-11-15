import { useContext } from 'react'
import {
  FiBarChart2,
  FiGitBranch,
  FiBox,
  FiClipboard,
  FiTrendingUp,
  FiFileText,
  FiUsers,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'

function Sidebar({ isOpen, onToggle, currentPage, onPageChange }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { id: 'farms', label: 'Farms', icon: FiGitBranch },
    { id: 'production', label: 'Production', icon: FiBox },
    { id: 'inventory', label: 'Inventory', icon: FiClipboard },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
    { id: 'reports', label: 'Reports', icon: FiFileText },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ]

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-primary text-white transition-all duration-300 shadow-lg overflow-y-auto`}>
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-secondary text-white'
                  : 'text-white hover:bg-secondary hover:bg-opacity-50'
              }`}
            >
              <IconComponent className="text-xl flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
