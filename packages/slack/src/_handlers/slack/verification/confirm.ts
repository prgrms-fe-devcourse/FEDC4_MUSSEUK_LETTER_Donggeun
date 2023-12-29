import { Handler } from 'express';
import { z } from 'zod';
import snsApi from '@/_apis/sns';
import { zodValidator } from '@/utils/zod';
import { makeRandomString } from '@/utils/crypto';
import redis from '@/utils/redis';

const CLIENT_ENDPOINT =
  process.env.NODE_ENV === 'production' ? process.env.DEPLOY_CLIENT_ENDPOINT : process.env.LOCAL_CLIENT_ENDPOINT;
const CONFIRMATION_PAGE = '/setting/slack/confirmation';
const EXPIRE_DURATION = 1000 * 60 * 5;

const requestSchema = z.object({
  query: z.object({
    code: z.string()
  })
});

type RequestData = z.infer<typeof requestSchema>;

const handler: Handler = async (req, res) => {
  const { query } = req as unknown as RequestData;
  const { code } = query;

  const verification = await redis('SLACK').get(code);

  if (!verification || Date.now() >= verification.expiresAt) {
    return res.status(400).send('인증 링크가 만료되었거나 잘못되었어요.');
  }

  const user = await snsApi.getAuthCheck(verification.accessToken);

  await snsApi.updateSlackProfile({
    fullName: user,
    accessToken: verification.accessToken,
    slackId: verification.slackId,
    slackWorkspace: verification.slackWorkspace
  });

  redis('SLACK').del(code);

  // 일회용 토큰. 이후에 사용자 액세스 토큰을 가져오기 위해 사용됨.
  const token = makeRandomString(64);

  redis('USER_TOKEN').setTemporarily(
    token,
    {
      accessToken: verification.accessToken
    },
    EXPIRE_DURATION
  );

  res.status(200).redirect(`${CLIENT_ENDPOINT}${CONFIRMATION_PAGE}?token=${token}`);
};

const confirmHandler: Handler[] = [zodValidator(requestSchema), handler];

export default confirmHandler;
