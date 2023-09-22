import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import parseUser from '@/apis/utils/parseUser';
import type { User } from '@/types';
import type { QueryOptions, UserResponse } from '@/apis/types';

export const getAuthUser = async () => {
  const { data } = await authInstance.get<UserResponse | ''>('/auth-user');

  if (data === '') throw new Error('Not authenticated yet');

  return parseUser(data);
};

const useAuthCheckQuery = (options?: QueryOptions<User>) => {
  return useQuery<User>({
    queryKey: queryKey.auth,
    queryFn: getAuthUser,
    staleTime: Infinity,
    ...options
  });
};

export default useAuthCheckQuery;
