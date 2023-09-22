import { Handler } from 'express';
import { z } from 'zod';
import snsApi from '@/apis/sns';
import { zodValidator } from '@/utils/zod';
import redis from '@/utils/redis';
import { User } from '@common/types';

const requestSchema = z.object({
  query: z.object({
    token: z.string()
  })
});

type RequestData = z.infer<typeof requestSchema>;

const handler: Handler = async (req, res) => {
  const { query } = req as unknown as RequestData;
  const { token } = query;

  const verification = await redis('USER_TOKEN').get(token);

  if (!token || !verification) {
    return res.status(400).send('토큰이 만료되었거나 잘못되었어요.');
  }

  redis('USER_TOKEN').del(token);

  let user: User;
  try {
    user = await snsApi.getAuthCheck(verification.accessToken);
  } catch (err) {
    return res.status(400).send('로그인 되어있지 않은 상태에요.');
  }

  res.status(200).json({
    user,
    token: verification.accessToken
  });
};

const findUserHandler: Handler[] = [zodValidator(requestSchema), handler];

export default findUserHandler;
