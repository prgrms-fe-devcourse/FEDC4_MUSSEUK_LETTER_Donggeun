import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { CommentResponse } from 'common/types/raws';

interface CustomRequestData {
  commentId: string;
}

interface RequestData {
  id: string;
}

const deleteComment = async ({ commentId }: CustomRequestData) => {
  const params: RequestData = {
    id: commentId
  };

  const { data } = await authInstance.delete<CommentResponse>('/comments/delete', { data: params });

  return data;
};

const useDeleteCommentMutation = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation<CommentResponse, AxiosError, CustomRequestData>({
    mutationFn: () => deleteComment({ commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.posts.all });
    }
  });
};

export default useDeleteCommentMutation;
