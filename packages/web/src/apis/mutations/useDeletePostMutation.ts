import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { PostResponse } from 'common/types/raws';

interface CustomRequestData {
  postId: string;
}

interface RequestData {
  id: string;
}

const deletePost = async ({ postId }: CustomRequestData) => {
  const params: RequestData = {
    id: postId
  };

  const { data } = await authInstance.delete<PostResponse>('/posts/delete', { data: params });

  return data;
};

const useDeletePostMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<PostResponse, AxiosError, CustomRequestData>({
    mutationFn: () => deletePost({ postId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.posts.all
      });
      queryClient.removeQueries({
        queryKey: queryKey.posts.detail(data._id)
      });
    }
  });
};

export default useDeletePostMutation;
