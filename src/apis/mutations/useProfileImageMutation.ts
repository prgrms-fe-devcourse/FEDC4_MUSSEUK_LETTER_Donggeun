import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';

interface FormData {
  isCover: false;
  image: string;
}

const postProfile = async (params: FormData) => {
  const { data } = await formDataInstance.post('/users/upload-photo', params);
  return data;
};

const useProfileImageMutation = () => {
  return useMutation({
    mutationFn: postProfile
  });
};

export default useProfileImageMutation;
