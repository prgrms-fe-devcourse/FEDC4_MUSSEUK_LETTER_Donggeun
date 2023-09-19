import { useQuery } from '@tanstack/react-query';
import { slackInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import { User } from '@/types';
import queryClient from '@/apis/queryClient';

type ResponseData = {
  user: User;
  token: string;
};

export const getTokenResult = async (slackToken: string) => {
  const { data } = await slackInstance.get<ResponseData>(`/slack/verification/user?token=${slackToken}`);

  storage('session').setItem(AUTH_TOKEN, data.token);

  queryClient.setQueryData(queryKey.auth, data.user);
  setTimeout(() => queryClient.removeQueries(queryKey.slack.token(slackToken)), 0);

  return data;
};

const useSlackTokenCheckQuery = (slackToken: string) => {
  return useQuery<ResponseData>({
    queryKey: queryKey.slack.token(slackToken),
    queryFn: () => getTokenResult(slackToken),
    suspense: true
  });
};

export default useSlackTokenCheckQuery;
