import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from '../instance';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import queryKey from '../queryKeys';

const postSignOut = async () => {
  const { data } = await authInstance.post('/logout');

  return data;
};

const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignOut,
    onMutate: () => {
      storage('local').removeItem(AUTH_TOKEN);
      queryClient.removeQueries({
        queryKey: queryKey.auth
      });
    }
  });
};

export default useSignOutMutation;
