import { useState } from 'react'
import StatsOverview from '../../components/StatsOverview'
import DashboardChart from '../../components/DashboardChart'
import EnhancedDataTable from '../../components/EnhancedDataTable'
import { FiFilter, FiDownload } from 'react-icons/fi'

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
      const taskData = tasks.map(t => ({
        title: t.title,
        farm: t.farm,
        priority: t.priority,
        status: t.status,
        date: t.dueDate,
      }))
      return <EnhancedDataTable title="Tasks" headers={['Task', 'Farm', 'Priority', 'Status', 'Due Date']} data={taskData} />
    }
    return null
  }

  const taskCompletionData = [
    { week: 'Week 1', value: 18 },
    { week: 'Week 2', value: 22 },
    { week: 'Week 3', value: 19 },
    { week: 'Week 4', value: 25 },
  ]

  const resourceAllocationData = [
    { resource: 'Labor', value: 35 },
    { resource: 'Equipment', value: 28 },
    { resource: 'Materials', value: 22 },
    { resource: 'Transport', value: 15 },
  ]

  const taskTableData = tasks.slice(0, 5).map(task => ({
    title: task.title,
    farm: task.farm,
    priority: task.priority,
    status: task.status,
    date: task.dueDate,
  }))

  return (
    <div className="space-y-6">
      <div className="dashboard-header">
        <h1>Operations Manager Dashboard</h1>
        <p>Daily operations, task management, and resource allocation</p>
      </div>

      <StatsOverview stats={kpis} />

      <div className="grid-charts">
        <DashboardChart title="Task Completion by Week" data={taskCompletionData} />
        <DashboardChart title="Resource Allocation" data={resourceAllocationData} />
      </div>

      <EnhancedDataTable 
        title="Recent Tasks" 
        headers={['Task Title', 'Farm', 'Priority', 'Status', 'Due Date']} 
        data={taskTableData}
        actions={
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center gap-2"><FiFilter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary flex items-center gap-2"><FiDownload className="w-4 h-4" /> Export</button>
          </div>
        }
      />
    </div>
  )
}

export default OperationsManagerDashboard
