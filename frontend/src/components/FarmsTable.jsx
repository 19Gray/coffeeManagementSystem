import { useState } from 'react'

function FarmsTable({ farms, setFarms }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', location: '', acres: '', workers: '' })

  const handleAddFarm = () => {
    if (formData.name && formData.location && formData.acres) {
      const newFarm = {
        id: Math.max(...farms.map(f => f.id), 0) + 1,
        ...formData,
        acres: parseInt(formData.acres),
        workers: parseInt(formData.workers) || 0,
        status: 'Active',
      }
      setFarms([...farms, newFarm])
      setFormData({ name: '', location: '', acres: '', workers: '' })
      setShowForm(false)
    }
  }

  const handleDeleteFarm = (id) => {
    setFarms(farms.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Farms Management</h1>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Farm'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Add New Farm</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddFarm() }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Farm Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Acres"
              value={formData.acres}
              onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Workers"
              value={formData.workers}
              onChange={(e) => setFormData({ ...formData, workers: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="submit" className="btn-primary md:col-span-2">Save Farm</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Location</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Acres</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Workers</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {farms.map(farm => (
                <tr key={farm.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{farm.name}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.location}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.acres}</td>
                  <td className="px-6 py-3 text-gray-600">{farm.workers}</td>
                  <td className="px-6 py-3"><span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">{farm.status}</span></td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteFarm(farm.id)}
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

export default FarmsTable
