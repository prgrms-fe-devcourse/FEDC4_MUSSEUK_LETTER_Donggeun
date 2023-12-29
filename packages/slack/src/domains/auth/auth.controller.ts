import express from 'express';
import { validator } from '@/utils/validator';
import authValidator from '@/domains/auth/auth.validator';
import { z } from 'zod';

const router = express.Router();

router.post('/signup', validator(authValidator.signup), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.signup.body>;

  res.json({ message: '회원가입 구현 필요..', body });
});

router.post('/signin', validator(authValidator.signin), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.signin.body>;

  res.json({ message: '로그인 구현 필요..', body });
});

router.post('/signout', (req, res) => {
  res.json({ message: '로그아웃 구현 필요..' });
});

router.get('/check', (req, res) => {
  res.json({ message: '로그인 상태 확인 구현 필요..' });
});

router.put('/password', validator(authValidator.password), (req, res) => {
  const body = req.body as z.infer<typeof authValidator.password.body>;

  res.json({ message: '비밀번호 변경 구현 필요..', body });
});

export default router;
