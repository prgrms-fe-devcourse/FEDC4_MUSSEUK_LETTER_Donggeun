import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { PostResponse } from '../types';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation<PostResponse, AxiosError, CustomRequestData>({
    mutationFn: () => deletePost({ postId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.posts.all);
      queryClient.removeQueries(queryKey.posts.detail(data._id));

      toast({
        title: '머쓱이가 결국 떠났어요.',
        status: 'success',
        position: 'top'
      });

      navigate('/');
    }
  });
};

export default useDeletePostMutation;
