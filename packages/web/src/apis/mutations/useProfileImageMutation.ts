import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import queryKey from '@/apis/queryKeys';
import parseUser from '../utils/parseUser';
import { UserResponse } from '../types';

interface FormData {
  isCover: false;
  image: File;
}

const postProfile = async (params: FormData) => {
  const { data } = await formDataInstance.post<UserResponse>('/users/upload-photo', params);

  return parseUser(data);
};

const useProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey.auth, data);
    }
  });
};

export default useProfileImageMutation;
