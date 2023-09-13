import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { ChannelResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';

const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

export const getPostsInfo = async () => {
  const { data } = await baseInstance.get<ChannelResponse[]>(`/posts/channel/${CHANNEL_ID}`);

  return data;
};

const useGetPostsInfoQuery = () => {
  return useQuery<ChannelResponse[]>({
    queryKey: queryKey.posts.all,
    queryFn: () => getPostsInfo()
  });
};

export default useGetPostsInfoQuery;
