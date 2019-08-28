import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.10.109.146:3333',
  baseURL: 'http://127.0.0.1:3333',
});

export default api;
