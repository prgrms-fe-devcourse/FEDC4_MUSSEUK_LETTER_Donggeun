import express, { Request, Response, NextFunction } from 'express';
import sendMessageHandler from '@/handlers/slack/sendMessage';
import { generateHandler, confirmHandler, findUserHandler } from '@/handlers/slack/verification';

const router = express.Router();

router.get('/', (req, res) => res.send(`Hello Slack Server!`));
router.post('/slack/message', sendMessageHandler);
router.route('/slack/verification').get(confirmHandler).post(generateHandler);
router.get('/slack/verification/user', findUserHandler);

/**
 * 앞선 미들웨어에서 처리되지 않은 오류는 이 미들웨어에서 처리합니다.
 */
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('서버 문제로 오류가 발생했어요.');
});

export default router;
