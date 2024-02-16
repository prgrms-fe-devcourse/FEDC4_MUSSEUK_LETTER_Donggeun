import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { UserResponse } from 'common/types/raws';
import queryKey from '@/apis/queryKeys';
import parseUser from 'common/utils/parseUser';

export const getSearchResult = async (keyword: string) => {
  const { data } = await baseInstance.get<UserResponse[]>(`/search/users/${keyword}`);
  return data.map((user) => parseUser(user)).filter((user) => user.username.includes(keyword));
};

export const searchUserQueryOption = (keyword: string) =>
  queryOptions({
    queryKey: queryKey.users.search(keyword),
    queryFn: () => getSearchResult(keyword),
    refetchOnMount: true,
    staleTime: 0
  });
