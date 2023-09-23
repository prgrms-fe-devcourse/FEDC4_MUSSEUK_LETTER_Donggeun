import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import type { CommentField } from 'common/types';
import type { CommentResponse } from 'common/types/raws';
import useSlackMessageMutation from './useSlackMessageMutation';
import usePostDetailQuery from '../queries/usePostDetailQuery';

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

  const { data } = await authInstance.post<CommentResponse>('/comments/create', params);

  return data;
};

const useWriteCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  const { mutate: slackMessage } = useSlackMessageMutation();
  const { data: postData } = usePostDetailQuery(postId);

  return useMutation<CommentResponse, AxiosError, CustomRequestData>({
    mutationFn: postWriteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.posts.all);

      const postAuthor = postData?.author;
      if (postAuthor?.slackId === undefined) return;

      slackMessage({
        postId: data.post,
        commentId: data._id
      });
    }
  });
};

export default useWriteCommentMutation;
