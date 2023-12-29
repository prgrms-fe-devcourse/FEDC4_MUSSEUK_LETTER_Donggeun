import express, { Request, Response, NextFunction } from 'express';
import authController from '@/domains/auth/auth.controller';

const router = express.Router();

router.use('/auth', authController);

/**
 * 앞선 미들웨어에서 처리되지 않은 오류는 이 미들웨어에서 처리합니다.
 */
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('서버 문제로 오류가 발생했어요.');
});

export default router;
