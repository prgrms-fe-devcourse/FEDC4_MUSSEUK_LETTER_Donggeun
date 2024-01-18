import { useSuspenseQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { QueryOptions } from '@/apis/types';
import { PostResponse } from 'common/types/raws';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';
import { Post } from 'common/types';

const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

export const getPostsInfo = async () => {
  const { data } = await baseInstance.get<PostResponse[]>(`/posts/channel/${CHANNEL_ID}`);

  return data.map((post) => parsePost(post));
};

const useGetPostsInfoQuery = (options?: QueryOptions<Post[]>) => {
  return useSuspenseQuery<Post[]>({
    queryKey: queryKey.posts.all,
    queryFn: () => getPostsInfo(),
    ...options
  });
};

export default useGetPostsInfoQuery;
