import axios from 'axios';

// Create an instance of Axios with the base URL of your API
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7187/api/Employee',  // The base URL of your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
