const axios = require('axios');

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

export default api;
