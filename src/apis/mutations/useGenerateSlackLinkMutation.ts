import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { slackInstance } from '@/apis/instance';
import type { SlackWorkspace } from '@/types';

interface RequestData {
  slackId: string;
  slackWorkspace: SlackWorkspace;
}

const generateSlackLink = async (params: RequestData) => {
  const { data } = await slackInstance.post('/slack/verification', params);

  return data;
};

const useGenerateSlackLinkMutation = () => {
  return useMutation<unknown, AxiosError, RequestData>({
    mutationFn: generateSlackLink
  });
};

export default useGenerateSlackLinkMutation;
