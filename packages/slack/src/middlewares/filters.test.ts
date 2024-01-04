import { NextFunction, Request, Response } from 'express';
import { ValidationError, AuthorizationError } from '@/utils/ResponseError';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { authorizationFilter, validationFilter } from './filters';

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {
    headers: {},
    body: {},
    query: {},
    params: {}
  };
  res = {};
  next = jest.fn();
});

describe('authorizationFilter', () => {
  it('accessToken이 정상적일 때 req.user, req.accessToken이 담기고 다음 미들웨어가 실행된다.', async () => {
    req = {
      headers: {
        authorization: 'Bearer 유효한_토큰'
      }
    };

    const mockUser = { id: 1, username: '사용자', role: 'user' };
    jwt.verify = jest.fn().mockReturnValueOnce(mockUser).mockReturnValueOnce(mockUser);

    // throwsOnError가 true일 때
    authorizationFilter(true)(req as Request, res as Response, next);
    expect(req.user).toEqual(mockUser);
    expect(req.accessToken).toEqual('유효한_토큰');
    expect(next).toHaveBeenCalledTimes(1);

    // throwsOnError가 false일 때
    authorizationFilter(false)(req as Request, res as Response, next);
    expect(req.user).toEqual(mockUser);
    expect(req.accessToken).toEqual('유효한_토큰');
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('accessToken이 존재하지 않을 때', async () => {
    // throwsOnError가 true이면, AuthorizationError를 발생시킨다.
    expect(authorizationFilter(true)(req as Request, res as Response, next)).rejects.toThrow(AuthorizationError);
    expect(next).toHaveBeenCalledTimes(0);
    expect(authorizationFilter()(req as Request, res as Response, next)).rejects.toThrow(AuthorizationError);
    expect(next).toHaveBeenCalledTimes(0);

    // throwsOnError가 false이면, 다음 미들웨어가 실행된다.
    authorizationFilter(false)(req as Request, res as Response, next);
    expect(req.user).toBeUndefined();
    expect(req.accessToken).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('accessToken이 유효하지 않을 때', async () => {
    req = {
      headers: {
        authorization: 'Bearer 유효하지_않은_토큰'
      }
    };

    // throwsOnError가 true이면, AuthorizationError를 발생시킨다.
    expect(authorizationFilter(true)(req as Request, res as Response, next)).rejects.toThrow(AuthorizationError);
    expect(next).toHaveBeenCalledTimes(0);
    expect(authorizationFilter()(req as Request, res as Response, next)).rejects.toThrow(AuthorizationError);
    expect(next).toHaveBeenCalledTimes(0);

    // throwsOnError가 false이면, 다음 미들웨어가 실행된다.
    authorizationFilter(false)(req as Request, res as Response, next);
    expect(req.user).toBeUndefined();
    expect(req.accessToken).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('validationFilter', () => {
  describe('body만 존재하는 경우', () => {
    const schema = {
      body: z.object({
        username: z.string().min(1).max(20),
        password: z
          .string()
          .min(8)
          .refine((value) => /\d/.test(value)),
        name: z.string().min(2).max(4)
      })
    };

    it('모든 필드 검증에 성공하면 다음 미들웨어가 실행된다', async () => {
      req = {
        body: {
          username: '아이디',
          password: '12341234',
          name: '이름'
        }
      };

      await expect(validationFilter(schema)(req as Request, res as Response, next)).resolves.toBeUndefined();
      expect(next).toHaveBeenCalled();
    });

    it('특정 필드 검증에 실패하면 validation 객체에 해당 필드에 대한 오류 메시지가 담긴다', async () => {
      req = {
        body: {
          username: '아이디',
          password: '1234',
          name: '이름'
        }
      };

      try {
        await validationFilter(schema)(req as Request, res as Response, next);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;

        expect(validationError.validation).toHaveProperty('password');
        expect(next).not.toHaveBeenCalled();
      }
    });

    it('여러 필드 검증에 실패하면 validation 객체에 각 필드에 대한 오류 메시지가 담긴다', async () => {
      try {
        await validationFilter(schema)(req as Request, res as Response, next);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;

        expect(validationError.validation).toHaveProperty('username');
        expect(validationError.validation).toHaveProperty('password');
        expect(validationError.validation).toHaveProperty('name');
        expect(next).not.toHaveBeenCalled();
      }
    });
  });

  describe('query, params, body 모두 존재하는 경우', () => {
    const schema = {
      query: z.object({
        page: z.string().min(2).max(20)
      }),
      params: z.object({
        id: z.string()
      }),
      body: z.object({
        username: z.string().min(1).max(20),
        password: z
          .string()
          .min(8)
          .refine((value) => /\d/.test(value)),
        name: z.string().min(2).max(4)
      })
    };

    it('모든 필드 검증에 성공하면 다음 미들웨어가 실행된다', async () => {
      req = {
        query: {
          page: '22'
        },
        body: {
          username: '아이디',
          password: '12341234',
          name: '이름'
        },
        params: {
          id: '1'
        }
      };

      await expect(validationFilter(schema)(req as Request, res as Response, next)).resolves.toBeUndefined();
      expect(next).toHaveBeenCalled();
    });

    it('여러 필드 검증에 실패하면 validation 객체에 해당 필드에 대한 오류 메시지가 담긴다', async () => {
      try {
        await validationFilter(schema)(req as Request, res as Response, next);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;

        expect(validationError.validation).toHaveProperty('page');
        expect(validationError.validation).toHaveProperty('username');
        expect(validationError.validation).toHaveProperty('password');
        expect(validationError.validation).toHaveProperty('name');
        expect(validationError.validation).toHaveProperty('id');
        expect(next).not.toHaveBeenCalled();
      }
    });
  });
});
