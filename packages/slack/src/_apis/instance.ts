import axios from 'axios';

export const slackApiInstance = axios.create({
  baseURL: process.env.SLACK_API_ENDPOINT
});

export const SnsApiInstance = axios.create({
  baseURL: process.env.SNS_API_ENDPOINT
});

slackApiInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${process.env.SLACK_BOT_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
