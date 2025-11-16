import { useState } from 'react'
import { useInventory } from '../hooks/useInventory'

function InventoryPage() {
  const { inventory, loading, error, createItem, updateItem, deleteItem } = useInventory()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ item: '', quantity: '', unit: '', reorderLevel: '', supplier: '' })
  const [formError, setFormError] = useState('')

  const handleAddItem = async () => {
    if (formData.item && formData.quantity && formData.supplier) {
      try {
        setFormError('')
        await createItem({
          itemName: formData.item,
          quantity: parseInt(formData.quantity),
          unit: formData.unit,
          minimumStock: parseInt(formData.reorderLevel) || 0,
          supplier: formData.supplier,
        })
        setFormData({ item: '', quantity: '', unit: '', reorderLevel: '', supplier: '' })
        setShowForm(false)
      } catch (err) {
        setFormError(err.message || 'Failed to add item')
      }
    }
  }

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await updateItem(id, { quantity: parseInt(newQuantity) })
    } catch (err) {
      console.error('Failed to update quantity', err)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id)
    } catch (err) {
      console.error('Failed to delete item', err)
    }
  }

  const lowStockItems = inventory.filter(item => item.quantity <= item.minimumStock)

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700">{error}</div>}
      {formError && <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700">{formError}</div>}
      
      {loading ? (
        <div className="p-6 text-center">Loading inventory...</div>
      ) : (
        <>
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
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inventory.map(item => (
                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.quantity <= item.minimumStock ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-3 text-gray-900">{item.itemName || item.item}</td>
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-3 text-gray-600">{item.unit}</td>
                      <td className="px-6 py-3 text-gray-600">{item.minimumStock}</td>
                      <td className="px-6 py-3">
                        <span className={`${item.quantity > item.minimumStock ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'} px-3 py-1 rounded-full text-xs font-semibold`}>
                          {item.quantity > item.minimumStock ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-600">{item.supplier}</td>
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
        </>
      )}
    </div>
  )
}

export default InventoryPage
