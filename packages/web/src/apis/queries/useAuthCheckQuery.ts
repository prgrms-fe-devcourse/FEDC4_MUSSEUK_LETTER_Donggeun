import { useQuery, queryOptions } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import parseUser from 'common/utils/parseUser';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import type { User } from 'common/types';
import type { QueryOptions } from '@/apis/types';
import type { UserResponse } from 'common/types/raws';

export const getAuthUser = async () => {
  const { data } = await authInstance.get<UserResponse | ''>('/auth-user');

  if (data === '') {
    storage('local').removeItem(AUTH_TOKEN);
    throw new Error('Not authenticated yet');
  }

  return parseUser(data);
};

export const authCheckOption = queryOptions({
  queryKey: queryKey.auth,
  queryFn: getAuthUser,
  staleTime: Infinity
});

// const useAuthCheckQuery = (options?: QueryOptions<User>) => {
//   return useQuery<User>({
//     queryKey: queryKey.auth,
//     queryFn: getAuthUser,
//     staleTime: Infinity,
//     ...options
//   });
// };

// export default useAuthCheckQuery;
