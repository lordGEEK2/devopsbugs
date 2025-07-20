import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// API functions
export const bugAPI = {
  // Submit a new bug report and get priority prediction
  predictBugPriority: async (bugData) => {
    try {
      const response = await api.post('/predict', bugData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to predict bug priority');
    }
  },

  // Get all bug reports
  getAllBugs: async () => {
    try {
      const response = await api.get('/bugs');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch bug reports');
    }
  },

  // Get a specific bug by ID
  getBugById: async (id) => {
    try {
      const response = await api.get(`/bugs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch bug report');
    }
  },

  // Health check endpoint
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'API health check failed');
    }
  }
};

export default api;