import { useState } from 'react'

function TeamAssignmentsTable({ assignments, setAssignments }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ 
    workerName: '', 
    task: '', 
    farm: '', 
    date: '', 
    time: '',
    status: 'Scheduled'
  })

  const handleAddAssignment = () => {
    if (formData.workerName && formData.task && formData.farm && formData.date && formData.time) {
      const newAssignment = {
        id: Math.max(...assignments.map(a => a.id), 0) + 1,
        ...formData,
      }
      setAssignments([...assignments, newAssignment])
      setFormData({ workerName: '', task: '', farm: '', date: '', time: '', status: 'Scheduled' })
      setShowForm(false)
    }
  }

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id))
  }

  const handleUpdateStatus = (id, newStatus) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: newStatus } : a))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Team Assignments</h1>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Assign Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Create New Assignment</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddAssignment() }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Worker Name"
              value={formData.workerName}
              onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
            <input
              type="text"
              placeholder="Task Title"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
            <select
              value={formData.farm}
              onChange={(e) => setFormData({ ...formData, farm: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            >
              <option value="">Select Farm</option>
              <option value="Rift Valley Farm">Rift Valley Farm</option>
              <option value="Mount Kenya Estate">Mount Kenya Estate</option>
              <option value="Central Highlands">Central Highlands</option>
              <option value="Nyambene Range">Nyambene Range</option>
            </select>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
            <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition md:col-span-2">Create Assignment</button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Worker</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Task</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Farm</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-700">{assignment.workerName}</td>
                <td className="px-6 py-3 text-gray-700">{assignment.task}</td>
                <td className="px-6 py-3 text-gray-700">{assignment.farm}</td>
                <td className="px-6 py-3 text-gray-700">{assignment.date}</td>
                <td className="px-6 py-3 text-gray-700">{assignment.time}</td>
                <td className="px-6 py-3">
                  <select 
                    value={assignment.status}
                    onChange={(e) => handleUpdateStatus(assignment.id, e.target.value)}
                    className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(assignment.status)}`}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-3">
                  <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition" onClick={() => handleDeleteAssignment(assignment.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamAssignmentsTable
