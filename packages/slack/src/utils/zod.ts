import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject, ZodTypeAny } from 'zod';

/**
 * Zod Schema로 Body, Query, Params를 검증하는 미들웨어 (deprecated)
 * (현재 deprecated 되어 있습니다. @/utils/validator를 사용해주세요.)
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
