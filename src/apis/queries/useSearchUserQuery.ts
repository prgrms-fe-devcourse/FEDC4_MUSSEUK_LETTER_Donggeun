import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { UserResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';

interface RequestQuery {
  keyword?: string;
}
export const getSearchResult = async ({ keyword }: RequestQuery) => {
  const { data } = await baseInstance.get<UserResponse[]>(`/search/users/${keyword}`);

  return data;
};

const useSearchUserQuery = (keyword: RequestQuery) => {
  return useQuery<UserResponse[]>({
    queryKey: queryKey.users.search,
    queryFn: getSearchResult(keyword)
  });
};

export default useSearchUserQuery;
