function GuestDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Great Rift Coffee Company</h1>
        <p className="text-gray-600">View our operations and production data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Production</h3>
          <p className="text-3xl font-bold text-primary">2,450</p>
          <p className="text-sm text-gray-600 mt-1">bags</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Active Farms</h3>
          <p className="text-3xl font-bold text-primary">18</p>
          <p className="text-sm text-gray-600 mt-1">operational farms</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-primary">KSH 1.25M</p>
          <p className="text-sm text-gray-600 mt-1">this month</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">About Us</h2>
        <p className="text-white opacity-90">
          Great Rift Coffee Company is committed to producing the finest quality coffee through sustainable agricultural practices and innovative management systems. Our dedication to excellence spans across all our operations.
        </p>
      </div>
    </div>
  )
}

export default GuestDashboard
