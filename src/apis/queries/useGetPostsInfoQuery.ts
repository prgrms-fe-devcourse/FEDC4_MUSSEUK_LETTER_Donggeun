import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { PostResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';
import parsePost from '../utils/parsePost';
import { Post } from '@/types';

const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

export const getPostsInfo = async () => {
  const { data } = await baseInstance.get<PostResponse[]>(`/posts/channel/${CHANNEL_ID}`);

  return data.map((post) => parsePost(post));
};

const useGetPostsInfoQuery = () => {
  return useQuery<Post[]>({
    queryKey: queryKey.posts.all,
    queryFn: () => getPostsInfo()
  });
};

export default useGetPostsInfoQuery;
