import { useMutation } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';

interface RequestData {
  password: string;
}

const putChangePassword = async (params: RequestData) => {
  const { data } = await authInstance.put('/settings/update-password', params);

  return data;
};

const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: putChangePassword
  });
};

export default useChangePasswordMutation;
