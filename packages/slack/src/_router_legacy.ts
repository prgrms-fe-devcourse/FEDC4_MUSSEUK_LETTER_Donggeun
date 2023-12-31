/**
 * @file 이 파일은 추후 리팩토링이 완성되면 삭제될 예정입니다.
 */

import express from 'express';
import sendMessageHandler from '@/_handlers/slack/sendMessage';
import { generateHandler, confirmHandler, findUserHandler } from '@/_handlers/slack/verification';

const router = express.Router();

router.get('/', (req, res) => res.send(`Hello Slack Server!`));
router.post('/slack/message', sendMessageHandler);
router.route('/slack/verification').get(confirmHandler).post(generateHandler);
router.get('/slack/verification/user', findUserHandler);

export default router;
