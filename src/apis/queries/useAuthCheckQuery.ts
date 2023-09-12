import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import type { QueryOptions, UserResponse } from '@/apis/types';

export const getAuthUser = async () => {
  const { data } = await authInstance.get<UserResponse | ''>('/auth-user');

  if (data === '') throw new Error('Not authenticated yet');

  return data;
};

const useAuthCheckQuery = (options?: QueryOptions<UserResponse>) => {
  return useQuery<UserResponse>({
    queryKey: queryKey.auth,
    queryFn: getAuthUser,
    cacheTime: Infinity,
    retry: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options
  });
};

export default useAuthCheckQuery;
