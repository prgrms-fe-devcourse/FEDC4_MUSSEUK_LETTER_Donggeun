import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { UserResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';

export const getSearchResult = async (keyword: string) => {
  const { data } = await baseInstance.get<UserResponse[]>(`/search/users/${keyword}`);

  return data;
};

const useSearchUserQuery = (keyword: string) => {
  return useQuery<UserResponse[]>({
    queryKey: queryKey.users.search(keyword),
    queryFn: () => getSearchResult(keyword),
    enabled: false
  });
};

export default useSearchUserQuery;
