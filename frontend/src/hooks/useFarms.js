import { useState, useEffect } from "react";
import { farmsAPI } from "../services/api";

export const useFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await farmsAPI.getAll();
      setFarms(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch farms");
      console.error("[useFarms Error]", err);
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const createFarm = async (farmData) => {
    try {
      const response = await farmsAPI.create(farmData);
      const newFarm = response.data;
      setFarms([...farms, newFarm]);
      return newFarm;
    } catch (err) {
      setError(err.message || "Failed to create farm");
      throw err;
    }
  };

  const updateFarm = async (id, farmData) => {
    try {
      const response = await farmsAPI.update(id, farmData);
      const updatedFarm = response.data;
      setFarms(farms.map((f) => (f.id === id ? updatedFarm : f)));
      return updatedFarm;
    } catch (err) {
      setError(err.message || "Failed to update farm");
      throw err;
    }
  };

  const deleteFarm = async (id) => {
    try {
      await farmsAPI.delete(id);
      setFarms(farms.filter((f) => f.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete farm");
      throw err;
    }
  };

  return {
    farms,
    loading,
    error,
    fetchFarms,
    createFarm,
    updateFarm,
    deleteFarm,
  };
};
