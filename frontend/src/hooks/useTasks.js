import { useState, useEffect } from "react";
import { tasksAPI } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksAPI.getAll();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      console.error("[useTasks Error]", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await tasksAPI.create(taskData);
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message || "Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await tasksAPI.update(id, taskData);
      const updatedTask = response.data;
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      return updatedTask;
    } catch (err) {
      setError(err.message || "Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
