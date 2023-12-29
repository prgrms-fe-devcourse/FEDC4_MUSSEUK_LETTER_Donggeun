import { slackApiInstance } from '@/_apis/instance';

export const postMessage = async ({ channel, text }: { channel: string; text: string }) => {
  await slackApiInstance.post('/chat.postMessage', {
    channel,
    text
  });
};

const slackApi = {
  postMessage
};

export default slackApi;
