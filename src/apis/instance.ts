import axios from 'axios';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

export const baseInstance = axios.create({ baseURL });
export const authInstance = axios.create({ baseURL });
export const formDataInstance = axios.create({ baseURL });

authInstance.interceptors.request.use(
  (config) => {
    const token = storage('session').getItem(AUTH_TOKEN, '');

    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formDataInstance.interceptors.request.use(
  (config) => {
    const token = storage('session').getItem(AUTH_TOKEN, '');

    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'multipart/form-data';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
