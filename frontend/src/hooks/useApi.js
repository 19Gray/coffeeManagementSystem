import { useState } from "react";

export const useApi = (apiFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFn(...args);
      return result;
    } catch (err) {
      const errorMessage = err.message || "API call failed";
      setError(errorMessage);
      console.error("[useApi Error]", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
