import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'YOUR_API_BASE_URL', 
  headers: {
    'Content-Type': 'application/json',
  },
});