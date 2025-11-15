import { useState } from 'react'

function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Great Rift Coffee Company',
    email: 'admin@grrc.com',
    phone: '+254 712 345 678',
    location: 'Nakuru, Kenya',
    timezone: 'East Africa Time (EAT)',
    currency: 'Kenyan Shilling (KES)',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
  })

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(settings)

  const handleSave = () => {
    setSettings(formData)
    setEditMode(false)
  }

  const handleReset = () => {
    setFormData(settings)
    setEditMode(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        {!editMode && (
          <button className="btn-primary" onClick={() => setEditMode(true)}>Edit Settings</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-6">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-primary mb-6">Regional Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option>East Africa Time (EAT)</option>
                <option>UTC</option>
                <option>GMT+2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option>Kenyan Shilling (KES)</option>
                <option>US Dollar (USD)</option>
                <option>Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-6">Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
              disabled={!editMode}
              className="w-5 h-5 accent-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-gray-700 font-medium">Enable In-App Notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.emailAlerts}
              onChange={(e) => setFormData({ ...formData, emailAlerts: e.target.checked })}
              disabled={!editMode}
              className="w-5 h-5 accent-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-gray-700 font-medium">Enable Email Alerts</span>
          </label>
        </div>
      </div>

      {editMode && (
        <div className="flex gap-3">
          <button className="btn-primary flex-1" onClick={handleSave}>Save Changes</button>
          <button className="btn-secondary flex-1" onClick={handleReset}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
