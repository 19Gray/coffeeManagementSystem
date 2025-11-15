import { useState } from 'react'

function UsersTable({ users, setUsers }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'farm_worker' })

  const handleAddUser = () => {
    if (formData.name && formData.email) {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        status: 'Active',
        lastLogin: 'Never',
      }
      setUsers([...users, newUser])
      setFormData({ name: '', email: '', role: 'farm_worker' })
      setShowForm(false)
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Add New User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddUser() }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="farm_worker">Farm Worker</option>
              <option value="supervisor">Supervisor</option>
              <option value="agronomist">Agronomist</option>
              <option value="operations_manager">Operations Manager</option>
              <option value="ict_manager">ICT Manager</option>
              <option value="ceo">CEO</option>
            </select>
            <button type="submit" className="btn-primary md:col-span-2">Add User</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Last Login</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{user.name}</td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 text-gray-600 capitalize">{user.role.replace('_', ' ')}</td>
                  <td className="px-6 py-3">
                    <span className={`${user.status === 'Active' ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
