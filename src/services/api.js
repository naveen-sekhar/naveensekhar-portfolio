import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    // If backend is not available, log to console as fallback
    console.log('Contact form submission (backend not configured):', formData);
    return { success: true, message: 'Message received! (Demo mode)' };
  }
};

export default api;
