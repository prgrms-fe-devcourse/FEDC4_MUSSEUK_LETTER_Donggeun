import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '@/utils/ResponseError';

export const authorizationFilter = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    // TODO: 로그인 체크 로직 구현
  } else {
    throw new AuthorizationError();
  }
};
