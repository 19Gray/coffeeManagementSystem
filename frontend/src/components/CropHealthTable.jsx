import { useState } from 'react'

function CropHealthTable({ cropHealth, setCropHealth }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ farm: '', variety: '', healthScore: '', leafSpot: 'None', pests: 'None' })

  const handleAddCrop = () => {
    if (formData.farm && formData.variety && formData.healthScore) {
      const newCrop = {
        id: Math.max(...cropHealth.map(c => c.id), 0) + 1,
        ...formData,
        healthScore: parseInt(formData.healthScore),
        lastAssessment: new Date().toISOString().split('T')[0],
      }
      setCropHealth([...cropHealth, newCrop])
      setFormData({ farm: '', variety: '', healthScore: '', leafSpot: 'None', pests: 'None' })
      setShowForm(false)
    }
  }

  const handleDeleteCrop = (id) => {
    setCropHealth(cropHealth.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Crop Health Monitoring</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Assessment'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Add Crop Assessment</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddCrop() }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.farm}
              onChange={(e) => setFormData({ ...formData, farm: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Select Farm</option>
              <option value="Rift Valley Farm">Rift Valley Farm</option>
              <option value="Mount Kenya Estate">Mount Kenya Estate</option>
              <option value="Central Highlands">Central Highlands</option>
              <option value="Nyambene Range">Nyambene Range</option>
            </select>
            <select
              value={formData.variety}
              onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Select Variety</option>
              <option value="Bourbon">Bourbon</option>
              <option value="Kent">Kent</option>
              <option value="SL28">SL28</option>
              <option value="Typica">Typica</option>
            </select>
            <input
              type="number"
              placeholder="Health Score (0-100)"
              value={formData.healthScore}
              onChange={(e) => setFormData({ ...formData, healthScore: e.target.value })}
              min="0"
              max="100"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              value={formData.leafSpot}
              onChange={(e) => setFormData({ ...formData, leafSpot: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            <select
              value={formData.pests}
              onChange={(e) => setFormData({ ...formData, pests: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="None">None</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Major">Major</option>
            </select>
            <button type="submit" className="btn-primary md:col-span-2">Add Assessment</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Variety</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Health Score</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Leaf Spot</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Pests</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Last Assessment</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cropHealth.map(crop => (
                <tr key={crop.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{crop.farm}</td>
                  <td className="px-6 py-3 text-gray-600">{crop.variety}</td>
                  <td className="px-6 py-3">
                    <span className={`${crop.healthScore >= 90 ? 'text-success' : crop.healthScore >= 80 ? 'text-warning' : 'text-danger'} font-semibold`}>
                      {crop.healthScore}%
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`${
                      crop.leafSpot === 'None' ? 'bg-green-100 text-success' :
                      crop.leafSpot === 'Low' ? 'bg-blue-100 text-primary' :
                      crop.leafSpot === 'Moderate' ? 'bg-yellow-100 text-warning' :
                      'bg-red-100 text-danger'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {crop.leafSpot}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{crop.pests}</td>
                  <td className="px-6 py-3 text-gray-600">{crop.lastAssessment}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteCrop(crop.id)}
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

export default CropHealthTable
