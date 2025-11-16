import { useState, useEffect } from "react";
import { usersAPI } from "../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersAPI.getAll();
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("[useUsers Error]", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const response = await usersAPI.create(userData);
      const newUser = response.data;
      setUsers([...users, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message || "Failed to create user");
      throw err;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await usersAPI.update(id, userData);
      const updatedUser = response.data;
      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update user");
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await usersAPI.delete(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete user");
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
