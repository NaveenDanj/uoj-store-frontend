import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://15.206.79.187:5001/api',
    timeout: 6*10000, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || "token"}`,
        'Origin': 'http://15.206.79.187'
    }
});
