/**
 * @file 이 파일은 추후 리팩토링이 완성되면 삭제될 예정입니다.
 */

import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject, ZodTypeAny } from 'zod';

/**
 * @deprecated Zod Schema로 Body, Query, Params를 검증하는 미들웨어
 * (현재 deprecated 되어 있습니다. @/middlewares/filters 의 validationFilter를 사용해주세요.)
 */
export const zodValidator = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      accessToken: req.accessToken
    });

    req = Object.assign(req, {
      body: parseResult.body ?? req.body,
      query: parseResult.query ?? req.query,
      params: parseResult.params ?? req.params,
      accessToken: parseResult.accessToken ?? req.accessToken
    });

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

/**
 * 숫자로 변환 가능한 문자열을 변환하는 Zod Transformer
 */
export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10);
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema);
