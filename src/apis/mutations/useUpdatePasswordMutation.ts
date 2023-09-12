import { useMutation } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';

interface RequestData {
  password: string;
}

const putUpdatePassword = async (params: RequestData) => {
  const { data } = await authInstance.put('/settings/update-password', params);

  return data;
};

const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: putUpdatePassword
  });
};

export default useUpdatePasswordMutation;
