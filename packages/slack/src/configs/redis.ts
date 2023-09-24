import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_REDIS_ENDPOINT : process.env.LOCAL_REDIS_ENDPOINT,
  password: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_REDIS_PASSWORD : undefined
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export default redisClient;
