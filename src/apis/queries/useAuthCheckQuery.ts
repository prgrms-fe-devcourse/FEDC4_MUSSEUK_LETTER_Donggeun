import { useQuery } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';

const useAuthCheckQuery = () => {
  return useQuery({
    queryKey: queryKey.auth,
    queryFn: async () => {
      // TODO: 응답 데이터를 임시로 unknown으로 설정했습니다.
      const { data } = await authInstance.get<unknown>('/auth-user');
      return data;
    }
  });
};

export default useAuthCheckQuery;
