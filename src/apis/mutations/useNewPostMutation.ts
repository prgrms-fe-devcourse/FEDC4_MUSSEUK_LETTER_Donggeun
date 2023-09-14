import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import queryKey from '../queryKeys';
import { string } from 'zod';

interface CustomRequestData {
  musseukTitle: string;
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
  const formData = new FormData();

  formData.append('title', customParams.musseukTitle);
  formData.append('image', customParams.musseukImage);
  formData.append('channelId', customParams.musseukIntroduce);

  const { data } = await formDataInstance.post('/posts/create', {
    formData
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
