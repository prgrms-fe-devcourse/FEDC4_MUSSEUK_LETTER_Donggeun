import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { QueryOptions } from '@/apis/types';
import { PostResponse } from 'common/types/raws';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';
import { Post } from 'common/types';

export const getPostDetail = async (id: string) => {
  const { data } = await baseInstance.get<PostResponse>(`/posts/${id}`);

  if (!data) throw new Error('Unvalid post ID');

  return parsePost(data);
};

const usePostDetailQuery = (id: string, options?: QueryOptions<Post>) => {
  return useQuery<Post>({
    queryKey: queryKey.posts.detail(id),
    queryFn: () => getPostDetail(id),
    retry: 0,
    ...options
  });
};

export default usePostDetailQuery;
