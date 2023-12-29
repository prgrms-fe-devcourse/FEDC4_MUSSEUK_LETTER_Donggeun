import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Zod Schema로 Body, Query, Params를 검증하는 미들웨어
 * @param schema 검증할 스키마
 */
export const validator =
  (schema: Partial<{ params: AnyZodObject; query: AnyZodObject; body: AnyZodObject }>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const results = {
      body: schema.body?.safeParse(req.body),
      query: schema.query?.safeParse(req.query),
      params: schema.params?.safeParse(req.params)
    };

    const errors = Object.values(results)
      .map((result) => (result?.success === false ? result.error : null))
      .filter((error) => error);

    if (errors.length === 0) {
      req = Object.assign(req, {
        body: results.body?.success ? results.body.data : req.body,
        query: results.query?.success ? results.query.data : req.query,
        params: results.params?.success ? results.params.data : req.params
      });

      return next();
    } else {
      const errorResult = errors.flatMap(
        (error) =>
          error?.issues.map((issue) => ({
            [issue.path[0]]: issue.message
          }))
      );

      return res.status(400).json({
        validation: errorResult.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      });
    }
  };
