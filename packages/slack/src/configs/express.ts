import express from 'express';
import cors from 'cors';
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [process.env.LOCAL_CLIENT_ENDPOINT, process.env.DEPLOY_CLIENT_ENDPOINT];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && whitelist.indexOf(origin) !== -1) callback(null, true);
      else callback(null, false);
    }
  })
);

app.use((req, res, next) => {
  const authorization = req.headers['authorization'];

  if (authorization?.startsWith('Bearer ')) {
    req.accessToken = authorization.split(' ')[1];
  }

  next();
});

export default app;
