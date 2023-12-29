import express, { Request, Response, NextFunction } from 'express';
import authController from '@/domains/auth/auth.controller';
import { ResponseError, ValidationError } from '@/utils/ResponseError';

const router = express.Router();

router.use('/auth', authController);

/**
 * @NOTE 앞선 미들웨어에서 오류 발생시 클라이언트에게 오류 응답을 전달합니다.
 */
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      message: err.message,
      validation: err.validation
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  console.error(err);
  res.status(500).send('서버 문제로 오류가 발생했어요.');
});

export default router;
