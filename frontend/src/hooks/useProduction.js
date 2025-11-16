import { useState, useEffect } from "react";
import { productionAPI } from "../services/api";

export const useProduction = () => {
  const [production, setProduction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduction = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productionAPI.getAll();
      setProduction(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch production data");
      console.error("[useProduction Error]", err);
      setProduction([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  const createProduction = async (productionData) => {
    try {
      const response = await productionAPI.create(productionData);
      const newProduction = response.data;
      setProduction([...production, newProduction]);
      return newProduction;
    } catch (err) {
      setError(err.message || "Failed to create production record");
      throw err;
    }
  };

  const updateProduction = async (id, productionData) => {
    try {
      const response = await productionAPI.update(id, productionData);
      const updatedProduction = response.data;
      setProduction(
        production.map((p) => (p.id === id ? updatedProduction : p))
      );
      return updatedProduction;
    } catch (err) {
      setError(err.message || "Failed to update production record");
      throw err;
    }
  };

  const deleteProduction = async (id) => {
    try {
      await productionAPI.delete(id);
      setProduction(production.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete production record");
      throw err;
    }
  };

  return {
    production,
    loading,
    error,
    fetchProduction,
    createProduction,
    updateProduction,
    deleteProduction,
  };
};
