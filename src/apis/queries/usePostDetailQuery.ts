import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { PostResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';

export const getPostDetail = async (id: number) => {
  const { data } = await baseInstance.get<PostResponse>(`/posts/${id}`);

  return data;
};

const usePostDetailQuery = (id: number) => {
  return useQuery<PostResponse>({
    queryKey: queryKey.posts.detail(id),
    queryFn: () => getPostDetail(id)
  });
};

export default usePostDetailQuery;
