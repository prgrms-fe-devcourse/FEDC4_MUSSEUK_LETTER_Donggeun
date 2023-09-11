import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import type { QueryOptions, UserResponse } from '@/apis/types';

export const getAuthUser = async () => {
  const { data } = await authInstance.get<UserResponse>('/auth-user');
  return data;
};

const useAuthCheckQuery = (options?: QueryOptions<UserResponse>) => {
  return useQuery<UserResponse>({
    queryKey: queryKey.auth,
    queryFn: getAuthUser,
    ...options
  });
};

export default useAuthCheckQuery;
