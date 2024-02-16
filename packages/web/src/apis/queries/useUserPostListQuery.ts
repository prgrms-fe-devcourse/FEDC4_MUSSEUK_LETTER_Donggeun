import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { PostResponse } from 'common/types/raws';
import parsePost from 'common/utils/parsePost';

export const getUserPostList = async (userId: string) => {
  const { data } = await baseInstance.get<PostResponse[]>(`/posts/author/${userId}`);

  return data.map((post) => parsePost(post));
};

export const userPostListQueryOption = (userId: string) =>
  queryOptions({
    queryKey: queryKey.posts.search(userId),
    queryFn: () => getUserPostList(userId)
  });
