import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token a las peticiones (si existe)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Proyectos
export const getAllProjects = (categoria = '') => {
  const params = categoria ? `?categoria=${categoria}` : '';
  return api.get(`/houses${params}`);
};

export const getProjectById = (id) => {
  return api.get(`/houses/${id}`);
};

export const deleteProject = (id) => {
  return api.delete(`/houses/${id}`);
};

export const removeImageFromProject = (projectId, imageUrl) => {
  return api.delete(`/houses/${projectId}/remove-image?imageUrl=${encodeURIComponent(imageUrl)}`);
};

// Crear proyecto
export const createProject = (formData) => {
  return api.post('/houses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Actualizar proyecto
export const updateProject = (id, formData) => {
  return api.put(`/houses/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Autenticación
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export default api;