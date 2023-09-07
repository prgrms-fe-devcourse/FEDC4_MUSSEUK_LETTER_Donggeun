import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import type { QueryOptions } from '@/apis/types';

// TODO: 응답 데이터를 임시로 비워뒀습니다. 원래의 데이터는 User 모델과 동일합니다.
interface ResponseData {}

export const getAuthUser = async () => {
  const { data } = await authInstance.get<ResponseData>('/auth-user');
  return data;
};

const useAuthCheckQuery = (options?: QueryOptions<ResponseData>) => {
  return useQuery<ResponseData>({
    queryKey: queryKey.auth,
    queryFn: getAuthUser,
    ...options
  });
};

export default useAuthCheckQuery;
