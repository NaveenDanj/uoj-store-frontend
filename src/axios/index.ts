import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
    }
});
