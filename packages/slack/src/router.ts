import express, { Request, Response, NextFunction } from 'express';
import authController from '@/domains/auth/auth.controller';
import commentsController from '@/domains/comments/comments.controller';
import postsController from '@/domains/posts/posts.controller';
import usersController from '@/domains/users/users.controller';
import { ResponseError, ValidationError, AuthorizationError } from '@/utils/ResponseError';

const router = express.Router();

router.use('/auth', authController);
router.use('/comments', commentsController);
router.use('/posts', postsController);
router.use('/users', usersController);

/**
 * @NOTE 앞선 미들웨어에서 오류 발생시 클라이언트에게 오류 응답을 전달합니다.
 */
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthorizationError) {
    return res.status(err.status).json({
      message: err.message
    });
  }

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
  return res.status(500).send({
    message: '서버 문제로 오류가 발생했어요.'
  });
});

export default router;
