import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import type { CommentField } from '@/types';
import type { CommentResponse } from '../types';

interface CustomRequestData extends CommentField {
  postId: string;
}

interface RequestData {
  comment: string;
  postId: string;
}

const postWriteComment = async ({ content, position, nickname, decorationImageName, postId }: CustomRequestData) => {
  const params: RequestData = {
    comment: JSON.stringify({
      content,
      position,
      nickname,
      decorationImageName
    }),
    postId
  };

  const { data } = await authInstance.post('/comments/create', params);

  return data;
};

const useWriteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CommentResponse, AxiosError, CustomRequestData>({
    mutationFn: postWriteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.posts.all);
    }
  });
};

export default useWriteCommentMutation;
