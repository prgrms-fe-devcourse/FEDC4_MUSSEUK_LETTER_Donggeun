import { useQuery } from '@tanstack/react-query';
import { slackInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from '../types';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';

type VerifyResponse = {
  user: UserResponse;
  token: string;
};

export const getTokenResult = async (slackToken: string) => {
  const { data } = await slackInstance.get<VerifyResponse>(`/slack/verification/user?token=${slackToken}`);
  storage('session').setItem(AUTH_TOKEN, data.token);
  return data.user;
};

const useSlackTokenCheckQuery = (slackToken: string) => {
  return useQuery<VerifyResponse>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKey.auth,
    queryFn: () => getTokenResult(slackToken)
  });
};

export default useSlackTokenCheckQuery;
