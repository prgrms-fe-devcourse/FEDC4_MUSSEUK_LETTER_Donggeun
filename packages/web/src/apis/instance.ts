import axios from 'axios';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';

const baseURL = import.meta.env.VITE_API_ENDPOINT;
const slackURL = import.meta.env.VITE_SLACK_API_ENDPOINT;

console.log(baseURL);

export const baseInstance = axios.create({ baseURL });
export const authInstance = axios.create({ baseURL });
export const formDataInstance = axios.create({ baseURL });
export const slackInstance = axios.create({ baseURL: slackURL });

authInstance.interceptors.request.use(
  (config) => {
    const token = storage('local').getItem(AUTH_TOKEN, '');

    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formDataInstance.interceptors.request.use(
  (config) => {
    const token = storage('local').getItem(AUTH_TOKEN, '');

    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'multipart/form-data';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

slackInstance.interceptors.request.use(
  (config) => {
    const token = storage('local').getItem(AUTH_TOKEN, '');

    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
