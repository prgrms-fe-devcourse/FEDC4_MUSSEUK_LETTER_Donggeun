import { Handler } from 'express';
import { z } from 'zod';
import slack from '@/_apis/slack';
import { SLACK_WORKSPACE } from 'common/constants/slack';
import { zodValidator } from '@/utils/zod';
import { makeRandomString } from '@/utils/crypto';
import redis from '@/utils/redis';

const API_ENDPOINT =
  process.env.NODE_ENV === 'production' ? process.env.DEPLOY_API_ENDPOINT : process.env.LOCAL_API_ENDPOINT;
const EXPIRE_DURATION = 1000 * 60 * 5;

const SLACK_DM_MESSAGE = (random: string) => `
당신의 슬랙 계정을 📮머-쓱 레터📮 서비스와 연동하려는 시도가 있어요!
본인이 맞다면 하단의 인증 링크를 클릭해주세요!

${API_ENDPOINT}/slack/verification?code=${random}
`;

const requestSchema = z.object({
  accessToken: z.string(),
  body: z.object({
    slackId: z.string(),
    slackWorkspace: z.enum(SLACK_WORKSPACE)
  })
});

type RequestData = z.infer<typeof requestSchema>;

const handler: Handler = async (req, res) => {
  const { body, accessToken } = req as RequestData;
  const { slackId, slackWorkspace } = body;
  const random = makeRandomString(64);

  redis('SLACK').setTemporarily(
    random,
    {
      accessToken,
      slackId,
      slackWorkspace,
      expiresAt: Date.now() + EXPIRE_DURATION
    },
    EXPIRE_DURATION
  );

  await slack.postMessage({
    channel: slackId,
    text: SLACK_DM_MESSAGE(random)
  });

  res.status(200).send('본인 인증 링크를 슬랙 DM으로 전송했어요.');
};

const generateHandler: Handler[] = [zodValidator(requestSchema), handler];

export default generateHandler;
