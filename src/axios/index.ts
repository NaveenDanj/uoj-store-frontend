import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://uoj.uk.to/api',
    timeout: 6*10000, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
    }
});
