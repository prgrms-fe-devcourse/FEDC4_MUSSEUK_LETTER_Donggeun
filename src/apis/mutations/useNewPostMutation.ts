import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import queryKey from '../queryKeys';

interface CustomRequestData {
  title: string;
  musseukImage: string;
  channelId: string;
}
interface ResponseData {
  _id: string;
  comments: Comment[];
  title: string;
}
interface AxiosError {
  error: string;
}
const postNewPost = async (customParams: CustomRequestData) => {
  const { data } = await formDataInstance.post('/posts/create', {
    title: customParams.title,
    image: null,
    channelId: customParams.channelId
  });
  return data;
};

const useNewPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseData, AxiosError, CustomRequestData>({
    mutationFn: postNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.posts.list);
    },
    onError: (error) => {
      console.log(error);
    }
  });
};

export default useNewPostMutation;
