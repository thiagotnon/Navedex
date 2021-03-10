import axios from 'axios';
import { getToken } from "./Auth";


const api = axios.create({
  baseURL: 'https://navedex-api.herokuapp.com/v1',
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;