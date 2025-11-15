import { useState } from 'react'

function InventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Fertilizer (Bags)', quantity: 450, unit: 'bags', reorderLevel: 200, supplier: 'AgriChem Ltd', lastRestocked: '2024-11-10' },
    { id: 2, item: 'Pesticide (Liters)', quantity: 125, unit: 'liters', reorderLevel: 50, supplier: 'PestControl Pro', lastRestocked: '2024-11-08' },
    { id: 3, item: 'Pruning Shears', quantity: 32, unit: 'pieces', reorderLevel: 10, supplier: 'Farm Tools Inc', lastRestocked: '2024-11-05' },
    { id: 4, item: 'Gloves (Pairs)', quantity: 200, unit: 'pairs', reorderLevel: 100, supplier: 'Safety Gear Co', lastRestocked: '2024-11-12' },
    { id: 5, item: 'Seedlings', quantity: 5000, unit: 'pieces', reorderLevel: 2000, supplier: 'Nursery Partners', lastRestocked: '2024-11-01' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ item: '', quantity: '', unit: '', reorderLevel: '', supplier: '' })

  const handleAddItem = () => {
    if (formData.item && formData.quantity && formData.supplier) {
      const newItem = {
        id: Math.max(...inventory.map(i => i.id), 0) + 1,
        ...formData,
        quantity: parseInt(formData.quantity),
        reorderLevel: parseInt(formData.reorderLevel) || 0,
        lastRestocked: new Date().toISOString().split('T')[0],
      }
      setInventory([...inventory, newItem])
      setFormData({ item: '', quantity: '', unit: '', reorderLevel: '', supplier: '' })
      setShowForm(false)
    }
  }

  const handleUpdateQuantity = (id, newQuantity) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    ))
  }

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id))
  }

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Item'}
        </button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-warning font-semibold">
            <strong>Low Stock Alert:</strong> {lowStockItems.length} items need restocking
          </p>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Add Inventory Item</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddItem() }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Unit (bags, liters, pieces, etc)"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Reorder Level"
              value={formData.reorderLevel}
              onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="submit" className="btn-primary">Add Item</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Item Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Unit</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Reorder Level</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Supplier</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Last Restocked</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map(item => (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.quantity <= item.reorderLevel ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-3 text-gray-900">{item.item}</td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-3 text-gray-600">{item.unit}</td>
                  <td className="px-6 py-3 text-gray-600">{item.reorderLevel}</td>
                  <td className="px-6 py-3">
                    <span className={`${item.quantity > item.reorderLevel ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {item.quantity > item.reorderLevel ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{item.supplier}</td>
                  <td className="px-6 py-3 text-gray-600">{item.lastRestocked}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                      onClick={() => handleDeleteItem(item.id)}
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

export default InventoryPage
