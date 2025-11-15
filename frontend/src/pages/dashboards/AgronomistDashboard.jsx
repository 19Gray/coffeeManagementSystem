import { useState } from 'react'
import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import CropHealthTable from '../../components/CropHealthTable'

function AgronomistDashboard({ currentPage, setCurrentPage }) {
  const [cropHealth, setCropHealth] = useState([
    { id: 1, farm: 'Rift Valley Farm', variety: 'Bourbon', healthScore: 92, leafSpot: 'Low', pests: 'None', lastAssessment: '2024-11-15' },
    { id: 2, farm: 'Mount Kenya Estate', variety: 'Kent', healthScore: 88, leafSpot: 'Moderate', pests: 'Minor', lastAssessment: '2024-11-14' },
    { id: 3, farm: 'Central Highlands', variety: 'SL28', healthScore: 95, leafSpot: 'None', pests: 'None', lastAssessment: '2024-11-15' },
    { id: 4, farm: 'Nyambene Range', variety: 'Typica', healthScore: 85, leafSpot: 'Moderate', pests: 'Minor', lastAssessment: '2024-11-13' },
  ])

  const kpis = [
    { label: 'Avg Health Score', value: '90%', change: '+2%', trend: 'up' },
    { label: 'Monitored Crops', value: '18 farms', change: '0', trend: 'up' },
    { label: 'Critical Alerts', value: '2', change: '-1', trend: 'down' },
    { label: 'Assessment Rate', value: '100%', change: '0', trend: 'up' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'farms') {
      return <CropHealthTable cropHealth={cropHealth} setCropHealth={setCropHealth} />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Agronomist Dashboard</h1>
        <p className="text-gray-600">Crop health monitoring and agricultural analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          title="Average Health Score by Farm"
          data={[
            { farm: 'Rift Valley', value: 92 },
            { farm: 'Mt Kenya', value: 88 },
            { farm: 'C. Highland', value: 95 },
            { farm: 'Nyambene', value: 85 },
          ]}
        />
        <ChartComponent
          title="Pest Distribution"
          data={[
            { pest: 'None', value: 10 },
            { pest: 'Minor', value: 6 },
            { pest: 'Moderate', value: 2 },
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Active Alerts</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-danger bg-red-50 p-4 rounded">
            <div className="flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">High Pest Activity - Mount Kenya Estate</h4>
                <p className="text-sm text-gray-600 mt-1">Moderate pest infestation detected. Recommend immediate intervention.</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">Today</span>
            </div>
          </div>
          <div className="border-l-4 border-warning bg-yellow-50 p-4 rounded">
            <div className="flex items-start gap-4">
              <span className="text-2xl">!</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Leaf Spot Disease - Nyambene Range</h4>
                <p className="text-sm text-gray-600 mt-1">Moderate leaf spot detected. Monitor and consider fungicide treatment.</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Crop Health Status</h2>
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
                      'bg-yellow-100 text-warning'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {crop.leafSpot}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{crop.pests}</td>
                  <td className="px-6 py-3 text-gray-600">{crop.lastAssessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AgronomistDashboard
