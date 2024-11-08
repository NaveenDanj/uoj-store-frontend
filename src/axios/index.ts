import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5001/api',
    baseURL: 'https://uoj.uk.to/api',
    timeout: 6*10000, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || "token"}`
    }
});




export const axiosSessionInstance = axios.create({
    // baseURL: 'http://localhost:5001/api',
    // baseURL: 'https://uoj.uk.to/api',
    timeout: 6*10000, 
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${sessionStorage.sessionToken || "token"}`
    }
});

axiosSessionInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem("sessionToken");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));