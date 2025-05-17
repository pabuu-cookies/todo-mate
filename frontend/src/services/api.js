// src/services/api.js

import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Store token in localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/register', userData);
    // Store token in localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem("token");
  },
};

// Todo API calls
export const todoAPI = {
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data.todos;
  },

  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data.todo;
  },

  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data.todo;
  },

  deleteTodo: async (id) => {
    await api.delete(`/todos/${id}`);
    return { id };
  },
};

export default api;