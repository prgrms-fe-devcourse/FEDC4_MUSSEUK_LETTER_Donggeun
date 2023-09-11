import { useMutation } from '@tanstack/react-query';
import { authInstance } from '../instance';

const postSignOut = async () => {
  const { data } = await authInstance.post('/logout');
  console.log(data);
  return data;
};

const useSignOutMutation = () => {
  return useMutation({
    mutationFn: postSignOut,
    onMutate: () => {
      sessionStorage.clear();
    }
  });
};

export default useSignOutMutation;
