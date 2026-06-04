// Centralized API Configuration
// All API calls should use this configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL || 'http://localhost:8081';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  WS_URL: WS_BASE_URL,
  CHATBOT_URL: CHATBOT_URL,
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to build WebSocket URLs
export const buildWsUrl = (path = '') => {
  return `${WS_BASE_URL}${path}`;
};
