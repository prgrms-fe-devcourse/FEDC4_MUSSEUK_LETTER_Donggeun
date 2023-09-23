import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { PostResponse } from '@common/types/raws';
import { Post } from '@/types';
import parsePost from '@common/utils/parsePost';

export const getUserPostList = async (userId: string) => {
  const { data } = await baseInstance.get<PostResponse[]>(`/posts/author/${userId}`);

  return data.map((post) => parsePost(post));
};

const useUserPostListQuery = (userId: string) => {
  return useQuery<Post[]>({
    queryKey: queryKey.posts.search(userId),
    queryFn: () => getUserPostList(userId)
  });
};

export default useUserPostListQuery;
