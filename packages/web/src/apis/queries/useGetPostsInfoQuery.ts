import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { PostResponse } from 'common/types/raws';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';

const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

export const getPostsInfo = async () => {
  const { data } = await baseInstance.get<PostResponse[]>(`/posts/channel/${CHANNEL_ID}`);

  return data.map((post) => parsePost(post));
};

export const getPostsInfoQueryOption = queryOptions({
  queryKey: queryKey.posts.all,
  queryFn: () => getPostsInfo()
});
