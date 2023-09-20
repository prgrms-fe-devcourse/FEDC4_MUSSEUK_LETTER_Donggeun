import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from '@/apis/types';
import parseUser from '../utils/parseUser';
import { User } from '@/types';

export const getUserInfo = async (userId: string) => {
  const { data } = await baseInstance.get<UserResponse>(`/users/${userId}`);

  return parseUser(data);
};

const useUserInfoQuery = (userId: string) => {
  return useQuery<User>({
    queryKey: queryKey.users.detail(userId),
    queryFn: () => getUserInfo(userId),
    suspense: true
  });
};

export default useUserInfoQuery;
