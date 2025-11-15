import { useState } from 'react'
import KPICard from '../../components/KPICard'
import ChartComponent from '../../components/ChartComponent'
import TasksTable from '../../components/TasksTable'

function OperationsManagerDashboard({ currentPage, setCurrentPage }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Equipment Maintenance', farm: 'Rift Valley Farm', priority: 'High', status: 'In Progress', dueDate: '2024-11-20' },
    { id: 2, title: 'Harvest Planning', farm: 'Mount Kenya Estate', priority: 'Critical', status: 'Pending', dueDate: '2024-11-18' },
    { id: 3, title: 'Worker Scheduling', farm: 'Central Highlands', priority: 'Medium', status: 'Completed', dueDate: '2024-11-15' },
    { id: 4, title: 'Supply Delivery', farm: 'Nyambene Range', priority: 'High', status: 'In Progress', dueDate: '2024-11-22' },
    { id: 5, title: 'Quality Inspection', farm: 'Rift Valley Farm', priority: 'Medium', status: 'Pending', dueDate: '2024-11-19' },
  ])

  const kpis = [
    { label: 'Active Tasks', value: '12', change: '+3', trend: 'up' },
    { label: 'Completion Rate', value: '85%', change: '+5%', trend: 'up' },
    { label: 'Resources Utilized', value: '73%', change: '+2%', trend: 'up' },
    { label: 'Pending Approvals', value: '3', change: '-1', trend: 'down' },
  ]

  if (currentPage !== 'dashboard') {
    if (currentPage === 'production') {
      return <TasksTable tasks={tasks} setTasks={setTasks} />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Operations Manager Dashboard</h1>
        <p className="text-gray-600">Daily operations, task management, and resource allocation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          title="Task Completion by Week"
          data={[
            { week: 'Week 1', value: 18 },
            { week: 'Week 2', value: 22 },
            { week: 'Week 3', value: 19 },
            { week: 'Week 4', value: 25 },
          ]}
        />
        <ChartComponent
          title="Resource Allocation"
          data={[
            { resource: 'Labor', value: 35 },
            { resource: 'Equipment', value: 28 },
            { resource: 'Materials', value: 22 },
            { resource: 'Transport', value: 15 },
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Task Title</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Farm</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.slice(0, 5).map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-900">{task.title}</td>
                  <td className="px-6 py-3 text-gray-600">{task.farm}</td>
                  <td className="px-6 py-3">
                    <span className={`${
                      task.priority === 'Critical' ? 'bg-red-100 text-danger' :
                      task.priority === 'High' ? 'bg-orange-100 text-warning' :
                      'bg-blue-100 text-primary'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`${
                      task.status === 'Completed' ? 'bg-green-100 text-success' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-primary' :
                      'bg-yellow-100 text-warning'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OperationsManagerDashboard
