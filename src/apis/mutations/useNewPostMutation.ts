import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import queryKey from '../queryKeys';

interface CustomRequestData {
  title: string;
  musseukImage: string;
  CHANNEL_ID: string;
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
  const { data } = await formDataInstance.post('/posts/create', {
    title: customParams.title,
    image: customParams.musseukImage || 'musseuk_default',
    channelId: customParams.CHANNEL_ID
  });
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
