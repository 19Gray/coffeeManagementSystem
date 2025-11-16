import { useState, useEffect } from "react";
import { inventoryAPI } from "../services/api";

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryAPI.getAll();
      setInventory(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch inventory");
      console.error("[useInventory Error]", err);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const createItem = async (itemData) => {
    try {
      const response = await inventoryAPI.create(itemData);
      const newItem = response.data;
      setInventory([...inventory, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message || "Failed to create inventory item");
      throw err;
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await inventoryAPI.update(id, itemData);
      const updatedItem = response.data;
      setInventory(inventory.map((i) => (i.id === id ? updatedItem : i)));
      return updatedItem;
    } catch (err) {
      setError(err.message || "Failed to update inventory item");
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await inventoryAPI.delete(id);
      setInventory(inventory.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete inventory item");
      throw err;
    }
  };

  return {
    inventory,
    loading,
    error,
    fetchInventory,
    createItem,
    updateItem,
    deleteItem,
  };
};
