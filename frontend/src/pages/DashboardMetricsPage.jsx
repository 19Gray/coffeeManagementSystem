import { useState } from 'react'

function DashboardMetricsPage() {
  const [metrics] = useState([
    {
      category: 'Production Metrics',
      items: [
        { name: 'Total Bags Produced', value: '2,450', unit: 'bags', status: 'good' },
        { name: 'Average Farm Yield', value: '2,275', unit: 'bags/farm', status: 'good' },
        { name: 'Production Efficiency', value: '94%', unit: 'efficiency', status: 'good' },
        { name: 'Waste Percentage', value: '2.1%', unit: 'waste', status: 'good' },
      ]
    },
    {
      category: 'Financial Metrics',
      items: [
        { name: 'Total Revenue', value: 'KSH 1,225,000', unit: 'KSH', status: 'good' },
        { name: 'Revenue per Bag', value: 'KSH 500', unit: 'KSH', status: 'good' },
        { name: 'Cost per Bag', value: 'KSH 280', unit: 'KSH', status: 'good' },
        { name: 'Profit Margin', value: '44%', unit: 'margin', status: 'good' },
      ]
    },
    {
      category: 'Quality Metrics',
      items: [
        { name: 'Average Quality Score', value: '88%', unit: 'score', status: 'neutral' },
        { name: 'Grade A+ Percentage', value: '32%', unit: 'of production', status: 'good' },
        { name: 'Grade A Percentage', value: '48%', unit: 'of production', status: 'good' },
        { name: 'Defect Rate', value: '3.2%', unit: 'defects', status: 'neutral' },
      ]
    },
    {
      category: 'Workforce Metrics',
      items: [
        { name: 'Total Workers', value: '245', unit: 'employees', status: 'good' },
        { name: 'Average Attendance', value: '93%', unit: 'rate', status: 'good' },
        { name: 'Tasks Completed', value: '186', unit: 'tasks', status: 'good' },
        { name: 'Productivity Score', value: '92%', unit: 'efficiency', status: 'good' },
      ]
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'border-l-4 border-green-500 bg-green-50'
      case 'neutral':
        return 'border-l-4 border-yellow-500 bg-yellow-50'
      case 'poor':
        return 'border-l-4 border-red-500 bg-red-50'
      default:
        return 'border-l-4 border-blue-500 bg-blue-50'
    }
  }

  const getStatusIndicatorColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-green-500'
      case 'neutral':
        return 'bg-yellow-500'
      case 'poor':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Metrics Dashboard</h1>
        <p className="text-gray-600">Comprehensive view of all operational metrics and KPIs</p>
      </div>

      <div className="space-y-8">
        {metrics.map((section, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className={`p-4 rounded-lg ${getStatusColor(item.status)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                    <span className={`w-3 h-3 rounded-full ${getStatusIndicatorColor(item.status)}`}></span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                    <span className="text-xs text-gray-600 ml-2">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            <span className="text-gray-700">Good - On or above target</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span className="text-gray-700">Neutral - Near target or needs attention</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="text-gray-700">Poor - Below target</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMetricsPage
