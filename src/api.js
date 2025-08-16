import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ht-backend-5eby.onrender.com', 
});

export default api;
