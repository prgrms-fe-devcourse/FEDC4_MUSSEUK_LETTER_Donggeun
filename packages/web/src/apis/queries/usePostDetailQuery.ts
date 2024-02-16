import { baseInstance } from '@/apis/instance';
import { PostResponse } from 'common/types/raws';
import { queryOptions } from '@tanstack/react-query';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';

export const getPostDetail = async (id: string) => {
  const { data } = await baseInstance.get<PostResponse>(`/posts/${id}`);

  if (!data) throw new Error('Unvalid post ID');

  return parsePost(data);
};

export const postDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: queryKey.posts.detail(id),
    queryFn: () => getPostDetail(id),
    retry: 0
  });
