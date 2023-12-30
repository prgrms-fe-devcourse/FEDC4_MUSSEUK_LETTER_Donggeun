import express from 'express';
import { validationFilter, authorizationFilter } from '@/middlewares/filters';
import authValidator from '@/domains/auth/auth.validator';
import { AuthorizationError } from '@/utils/ResponseError';
import { z } from 'zod';
import authService from './auth.service';

const router = express.Router();

router.post('/signup', validationFilter(authValidator.signup), async (req, res) => {
  const { name, password, username } = req.body as z.infer<typeof authValidator.signup.body>;
  const { userId, accessToken } = await authService.signUp(username, password, name);
  res.json({ userId, accessToken });
});

router.post('/signin', validationFilter(authValidator.signin), async (req, res) => {
  const { username, password } = req.body as z.infer<typeof authValidator.signin.body>;
  const { userId, accessToken } = await authService.signIn(username, password);
  res.json({ userId, accessToken });
});

router.post('/signout', (req, res) => {
  res.json({ message: 'TODO: 로그아웃 구현 필요..' });
});

router.get('/check', authorizationFilter, async (req, res) => {
  const signedUser = req.user;
  const accessToken = req.accessToken;

  if (!signedUser || !accessToken) {
    throw new AuthorizationError();
  }

  const { userId } = await authService.signCheck(signedUser.id);

  res.json({ userId, accessToken });
});

router.put('/password', authorizationFilter, validationFilter(authValidator.password), async (req, res) => {
  const { password } = req.body as z.infer<typeof authValidator.password.body>;
  const signedUser = req.user;

  if (!signedUser) {
    throw new AuthorizationError();
  }

  await authService.changePassword(signedUser.id, password);

  res.json({ message: '비밀번호가 변경되었어요.' });
});

export default router;
