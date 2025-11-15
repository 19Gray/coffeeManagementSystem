import { useState } from 'react'
import TaskCard from '../../components/TaskCard'

function FarmWorkerDashboard({ currentPage, setCurrentPage }) {
  const [myTasks] = useState([
    { id: 1, title: 'Morning Crop Inspection', description: 'Inspect coffee plants for diseases and pests', farm: 'Rift Valley Farm', date: '2024-11-16', time: '08:00 AM', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Soil Preparation', description: 'Prepare soil for new seedlings in sector A', farm: 'Rift Valley Farm', date: '2024-11-16', time: '10:00 AM', priority: 'Medium', status: 'Pending' },
    { id: 3, title: 'Weeding', description: 'Remove weeds from main plantation', farm: 'Rift Valley Farm', date: '2024-11-16', time: '02:00 PM', priority: 'Low', status: 'Pending' },
  ])

  const [stats] = useState({
    tasksToday: 3,
    tasksCompleted: 1,
    tasksInProgress: 1,
    attendance: '95%',
    farm: 'Rift Valley Farm',
    supervisor: 'John Kipchoge',
  })

  if (currentPage !== 'dashboard') {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">My Daily Tasks</h1>
        <p className="text-gray-600">Welcome back! Here are your tasks for today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Today's Tasks</p>
          <p className="text-3xl font-bold text-primary">{stats.tasksToday}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-green-200 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Completed</p>
          <p className="text-3xl font-bold text-success">{stats.tasksCompleted}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-blue-200 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">In Progress</p>
          <p className="text-3xl font-bold text-primary">{stats.tasksInProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Attendance</p>
          <p className="text-3xl font-bold text-primary">{stats.attendance}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Farm Assignment</h3>
          <p className="text-gray-600 text-lg">{stats.farm}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Your Supervisor</h3>
          <p className="text-gray-600 text-lg">{stats.supervisor}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Today's Assignments</h2>
        <div className="space-y-3">
          {myTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Safety Reminders</h2>
        <div className="space-y-3">
          <div className="bg-yellow-50 border-l-4 border-warning rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Always wear protective equipment</h4>
                <p className="text-sm text-gray-600 mt-1">Ensure you have gloves, boots, and hat before starting field work.</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <h4 className="font-semibold text-gray-900">Stay hydrated</h4>
                <p className="text-sm text-gray-600 mt-1">Remember to drink water regularly throughout the day, especially during peak hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmWorkerDashboard
