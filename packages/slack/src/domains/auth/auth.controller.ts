import express from 'express';
import { validationFilter, authorizationFilter } from '@/middlewares/filters';
import authValidator from '@/domains/auth/auth.validator';
import { z } from 'zod';
import authService from './auth.service';

const router = express.Router();

router.post('/signup', validationFilter(authValidator.signup), async (req, res) => {
  const { name, password, username } = req.body as z.infer<typeof authValidator.signup.body>;
  const { userId, accessToken } = await authService.signup(username, password, name);
  res.json({ userId, accessToken });
});

router.post('/signin', validationFilter(authValidator.signin), async (req, res) => {
  const { username, password } = req.body as z.infer<typeof authValidator.signin.body>;
  const { userId, accessToken } = await authService.signin(username, password);
  res.json({ userId, accessToken });
});

router.post('/signout', (req, res) => {
  res.json({ message: 'TODO: 로그아웃 구현 필요..' });
});

router.get('/check', authorizationFilter, (req, res) => {
  const signedUser = req.user;

  res.json({ message: 'TODO: 로그인 상태 확인 구현 필요..', signedUser });
});

router.put('/password', validationFilter(authValidator.password), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.password.body>;

  res.json({ message: 'TODO: 비밀번호 변경 구현 필요..', body });
});

export default router;
