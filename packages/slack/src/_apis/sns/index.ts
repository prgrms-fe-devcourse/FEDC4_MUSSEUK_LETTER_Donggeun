import { AxiosRequestConfig } from 'axios';
import getAuthCheck from './users/getAuthCheck';
import updateSlackProfile from './users/updateSlackProfile';
import getPostDetail from './posts/getPostDetail';

export const HEADERS_AUTHORIZATION = (accessToken: string) =>
  ({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }) satisfies AxiosRequestConfig;

const snsApi = {
  getAuthCheck,
  updateSlackProfile,
  getPostDetail
};

export default snsApi;
