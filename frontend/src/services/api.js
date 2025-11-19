const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios-like API instance
export const apiCall = async (endpoint, options = {}) => {
  const { method = "GET", body = null, headers = {} } = options;

  const token = localStorage.getItem("authToken");
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data.message || `API Error: ${response.status}`;
      if (data.details) {
        if (Array.isArray(data.details)) {
          errorMessage +=
            ": " +
            data.details.map((d) => `${d.field}: ${d.message}`).join(", ");
        } else if (typeof data.details === "object") {
          errorMessage +=
            ": " +
            Object.entries(data.details)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ");
        }
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("[API Error]", error.message);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  signup: (name, email, password, role) =>
    apiCall("/auth/register", {
      method: "POST",
      body: { name, email, password, role },
    }),

  getProfile: () => apiCall("/auth/profile"),

  updateProfile: (data) =>
    apiCall("/auth/profile", {
      method: "PUT",
      body: data,
    }),
};

// Signup Code APIs
export const signupCodeAPI = {
  verify: (code, role) =>
    apiCall("/auth/codes/verify", {
      method: "POST",
      body: { code, role },
    }),
  generate: (role) =>
    apiCall("/auth/codes/generate", {
      method: "POST",
      body: { role },
    }),
  getAll: () => apiCall("/auth/codes"),
};

// Farms APIs
export const farmsAPI = {
  getAll: () => apiCall("/farms"),
  getById: (id) => apiCall(`/farms/${id}`),
  create: (data) =>
    apiCall("/farms", {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    apiCall(`/farms/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    apiCall(`/farms/${id}`, {
      method: "DELETE",
    }),
};

// Inventory APIs
export const inventoryAPI = {
  getAll: () => apiCall("/inventory"),
  getById: (id) => apiCall(`/inventory/${id}`),
  create: (data) =>
    apiCall("/inventory", {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    apiCall(`/inventory/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    apiCall(`/inventory/${id}`, {
      method: "DELETE",
    }),
};

// Production APIs
export const productionAPI = {
  getAll: () => apiCall("/production"),
  getById: (id) => apiCall(`/production/${id}`),
  create: (data) =>
    apiCall("/production", {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    apiCall(`/production/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    apiCall(`/production/${id}`, {
      method: "DELETE",
    }),
};

// Tasks APIs
export const tasksAPI = {
  getAll: () => apiCall("/tasks"),
  getById: (id) => apiCall(`/tasks/${id}`),
  create: (data) =>
    apiCall("/tasks", {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    apiCall(`/tasks/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    apiCall(`/tasks/${id}`, {
      method: "DELETE",
    }),
};

// Users APIs
export const usersAPI = {
  getAll: () => apiCall("/users"),
  getById: (id) => apiCall(`/users/${id}`),
  create: (data) =>
    apiCall("/users", {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    apiCall(`/users/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    apiCall(`/users/${id}`, {
      method: "DELETE",
    }),
};

export default {
  post: async (endpoint, body) => {
    return apiCall(endpoint, { method: "POST", body });
  },
  get: (endpoint) => apiCall(endpoint),
  put: (endpoint, body) => apiCall(endpoint, { method: "PUT", body }),
  delete: (endpoint) => apiCall(endpoint, { method: "DELETE" }),
  authAPI,
  signupCodeAPI,
  farmsAPI,
  inventoryAPI,
  productionAPI,
  tasksAPI,
  usersAPI,
};
