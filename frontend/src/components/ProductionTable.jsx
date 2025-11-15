import { useState } from 'react'

function ProductionTable({ production, setProduction }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ farmName: '', month: '', bags: '', quality: '', revenue: '' })

  const handleAddProduction = () => {
    if (formData.farmName && formData.month && formData.bags) {
      const newRecord = {
        id: Math.max(...production.map(p => p.id), 0) + 1,
        ...formData,
        bags: parseInt(formData.bags),
      }
      setProduction([...production, newRecord])
      setFormData({ farmName: '', month: '', bags: '', quality: '', revenue: '' })
      setShowForm(false)
    }
  }

  const handleDeleteProduction = (id) => {
    setProduction(production.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Production Records</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Add Production Record</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddProduction() }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Farm Name"
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Bags"
              value={formData.bags}
              onChange={(e) => setFormData({ ...formData, bags: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              value={formData.quality}
              onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Quality</option>
              <option value="Grade A+">Grade A+</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
            </select>
            <input
              type="text"
              placeholder="Revenue"
              value={formData.revenue}
              onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="submit" className="btn-primary">Save Record</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Month</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Bags</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Quality</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {production.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{record.farmName}</td>
                  <td className="px-6 py-3 text-gray-600">{record.month}</td>
                  <td className="px-6 py-3 text-gray-600">{record.bags}</td>
                  <td className="px-6 py-3 text-gray-600">{record.quality}</td>
                  <td className="px-6 py-3 text-gray-600">{record.revenue}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteProduction(record.id)}
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

export default ProductionTable
