import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from 'common/types/raws';
import parseUser from 'common/utils/parseUser';

export const getUserInfo = async (userId: string) => {
  const { data } = await baseInstance.get<UserResponse>(`/users/${userId}`);

  return parseUser(data);
};

export const userInfoQueryOption = (userId: string) =>
  queryOptions({
    queryKey: queryKey.users.detail(userId),
    queryFn: () => getUserInfo(userId)
  });
