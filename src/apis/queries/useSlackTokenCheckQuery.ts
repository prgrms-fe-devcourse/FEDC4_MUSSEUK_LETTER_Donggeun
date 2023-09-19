import { useQuery } from '@tanstack/react-query';
import { slackInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import { User } from '@/types';

type VerifyResponse = {
  user: User;
  token: string;
};

export const getTokenResult = async (slackToken: string) => {
  const { data } = await slackInstance.get<VerifyResponse>(`/slack/verification/user?token=${slackToken}`);
  storage('session').setItem(AUTH_TOKEN, data.token);
  return data.user;
};

const useSlackTokenCheckQuery = (slackToken: string) => {
  return useQuery<User>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKey.auth,
    queryFn: () => getTokenResult(slackToken)
  });
};

export default useSlackTokenCheckQuery;
