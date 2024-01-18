import { useSuspenseQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from 'common/types/raws';
import parseUser from 'common/utils/parseUser';
import { User } from 'common/types';

export const getUserInfo = async (userId: string) => {
  const { data } = await baseInstance.get<UserResponse>(`/users/${userId}`);

  return parseUser(data);
};

const useUserInfoQuery = (userId: string) => {
  return useSuspenseQuery<User>({
    queryKey: queryKey.users.detail(userId),
    queryFn: () => getUserInfo(userId)
  });
};

export default useUserInfoQuery;
