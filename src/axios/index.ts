import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://15.206.79.187/api',
    timeout: 6*10000, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
    }
});
