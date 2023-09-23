import { Handler } from 'express';
import { z } from 'zod';
import snsApi from '@/apis/sns';
import slackApi from '@/apis/slack';
import { zodValidator } from '@/utils/zod';
import type { Post, Comment } from 'common/types';

const TITLE_DEFAULT = '머쓱이';
const NICKNAME_DEFAULT = '익명의 머쓱이';

const CLIENT_ENDPOINT =
  process.env.NODE_ENV === 'production' ? process.env.DEPLOY_CLIENT_ENDPOINT : process.env.LOCAL_CLIENT_ENDPOINT;

const DM_TEXT_CONTENT = (post: Post, comment: Comment) => `
💌 To. ${post.title ?? TITLE_DEFAULT}

당신에게 새로운 편지가 도착했어요!
내용을 읽어보려면 아래 링크를 클릭하세요!

📮 From. ${comment.nickname ?? NICKNAME_DEFAULT}

${CLIENT_ENDPOINT}/post/${post._id}?commentId=${comment._id}
`;

const requestSchema = z.object({
  body: z.object({
    postId: z.string(),
    commentId: z.string()
  })
});

type RequestData = z.infer<typeof requestSchema>;

const handler: Handler = async (req, res) => {
  const { body } = req as RequestData;
  const { postId, commentId } = body;

  const post = await snsApi.getPostDetail(postId);
  const comment = post.comments.find((c) => c._id === commentId);
  const author = post.author;

  if (!comment) {
    return res.status(404).send(`해당 코멘트를 찾을 수 없어요`);
  }

  // TODO: 코멘트를 작성한지 1분이 지났으면 슬랙 DM을 보내지 않도록 처리해야 해요.

  if (!author.slackId) {
    return res.status(400).send(`해당 유저는 슬랙과 연동하지 않았어요`);
  }

  await slackApi.postMessage({
    channel: author.slackId,
    text: DM_TEXT_CONTENT(post, comment)
  });

  res.status(200).send(`슬랙 DM 전송 완료!`);
};

const sendMessageHandler: Handler[] = [zodValidator(requestSchema), handler];

export default sendMessageHandler;
