import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import queryKey from '../queryKeys';
import { string } from 'zod';
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

interface CustomRequestData {
  title: string;
  musseukImage: string;
  musseukIntroduce: string;
}
interface ResponseData {
  _id: string;
  comments: Comment[];
  title: string;
}
interface AxiosError {
  error: string;
}
const getNewPost = async (customParams: CustomRequestData) => {
  const { data } = await formDataInstance.post('/posts/create');
  return data;
};

const useNewPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseData, AxiosError, CustomRequestData>({
    mutationFn: getNewPost,
    onMutate: () => {
      queryClient.setQueryData(queryKey.auth, null);
    }
  });
};

export default useNewPostMutation;
