import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from '@/apis/types';
import parseUser from '../utils/parseUser';
import { User } from '@/types';

export const getUserInfo = async (userId: string) => {
  const { data } = await baseInstance.get<UserResponse>(`/users/${userId}`);

  // if (typeof data.fullName === 'string') {
  //   data.fullName = JSON.parse(data.fullName);
  // }
  return parseUser(data);
};

const useUserInfoQuery = (userId: string) => {
  return useQuery<User>({
    queryKey: queryKey.users.detail(userId),
    queryFn: () => getUserInfo(userId)
  });
};

export default useUserInfoQuery;
