import express from 'express';
import cors from 'cors';
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  process.env.LOCAL_CLIENT_ENDPOINT,
  process.env.DEPLOY_CLIENT_ENDPOINT,
  process.env.DEPLOY_CLIENT_ENDPOINT_LEGACY
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && whitelist.indexOf(origin) !== -1) callback(null, true);
      else callback(null, false);
    }
  })
);

/**
 * TODO: 리팩토링 완료 후에는 삭제될 코드입니다.
 */
app.use((req, res, next) => {
  const authorization = req.headers['authorization'];

  if (authorization?.startsWith('Bearer ')) {
    req.accessToken = authorization.split(' ')[1];
  }

  next();
});

export default app;
