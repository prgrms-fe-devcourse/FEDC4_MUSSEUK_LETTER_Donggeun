import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

export const baseInstance = axios.create({ baseURL });
export const authInstance = axios.create({ baseURL });
export const formDataInstance = axios.create({ baseURL });

authInstance.interceptors.request.use(
  (config) => {
    // TODO: 임시 코드입니다. 이후에 로그인 토큰 저장 관련 로직 작성시 수정해야 합니다.
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formDataInstance.interceptors.request.use(
  (config) => {
    // TODO: 임시 코드입니다. 이후에 로그인 토큰 저장 관련 로직 작성시 수정해야 합니다.
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'multipart/form-data';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
