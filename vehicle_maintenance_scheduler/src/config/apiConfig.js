const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://20.207.122.201/evaluation-service';

// You need to get this token from the evaluation service
// For now, let's try with a basic approach
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE'  // You need to get the actual token
    }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
    config => {
        console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
);

module.exports = { apiClient, API_BASE_URL };