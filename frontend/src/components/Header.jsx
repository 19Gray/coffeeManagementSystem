import { useContext } from 'react'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import AuthContext from '../context/AuthContext'

function Header({ onSidebarToggle }) {
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="text-xl text-primary hover:text-secondary transition-colors p-2"
          >
            <FiMenu size={24} />
          </button>
          <div className="flex items-center gap-3 hidden sm:flex">
            <img src="/great-rift-logo.png" alt="Great Rift Coffee" className="h-10 w-auto" />
            <h2 className="text-lg font-semibold text-primary">
              Great Rift Coffee
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-xs font-semibold text-primary uppercase">
              {user?.role?.replace('_', ' ')}
            </span>
            <span className="block text-sm text-gray-600">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FiLogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
