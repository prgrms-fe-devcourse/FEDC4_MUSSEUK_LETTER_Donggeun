import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { slackInstance } from '@/apis/instance';

interface RequestData {
  postId: string;
  commentId: string;
}

const postSlackMessage = async (params: RequestData) => {
  const { data } = await slackInstance.post('/slack/message', params);

  return data;
};

const useSlackMessageMutation = () => {
  return useMutation<unknown, AxiosError, RequestData>({
    mutationFn: postSlackMessage
  });
};

export default useSlackMessageMutation;
