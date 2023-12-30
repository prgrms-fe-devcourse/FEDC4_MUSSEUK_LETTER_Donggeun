import express from 'express';
import { validationFilter } from '@/middlewares/validationFilter';
import authValidator from '@/domains/auth/auth.validator';
import { z } from 'zod';
import authService from './auth.service';

const router = express.Router();

router.post('/signup', validationFilter(authValidator.signup), async (req, res) => {
  const { name, password, username } = req.body as z.infer<typeof authValidator.signup.body>;
  const user = await authService.signup(username, password, name);
  res.json({ userId: user.id, accessToken: 'TODO: 토큰 발급해야함..' });
});

router.post('/signin', validationFilter(authValidator.signin), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.signin.body>;

  res.json({ message: 'TODO: 로그인 구현 필요..', body });
});

router.post('/signout', (req, res) => {
  res.json({ message: 'TODO: 로그아웃 구현 필요..' });
});

router.get('/check', (req, res) => {
  res.json({ message: 'TODO: 로그인 상태 확인 구현 필요..' });
});

router.put('/password', validationFilter(authValidator.password), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.password.body>;

  res.json({ message: 'TODO: 비밀번호 변경 구현 필요..', body });
});

export default router;
