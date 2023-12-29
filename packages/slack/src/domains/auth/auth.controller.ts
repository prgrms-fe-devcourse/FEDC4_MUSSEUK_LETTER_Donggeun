import express from 'express';
import { validator } from '@/utils/validator';
import authValidator from '@/domains/auth/auth.validator';

const router = express.Router();

router.post('/signup', validator(authValidator.signup), (req, res) => {
  res.json({ message: 'Hello!', body: req.body, query: req.query, params: req.params });
});

export default router;
