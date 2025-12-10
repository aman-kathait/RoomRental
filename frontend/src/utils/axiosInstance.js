import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'YOUR_API_BASE_URL', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});