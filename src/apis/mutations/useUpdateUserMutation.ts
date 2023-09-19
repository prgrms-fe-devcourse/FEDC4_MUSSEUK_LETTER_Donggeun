import { useMutation } from '@tanstack/react-query';
import { authInstance } from '../instance';

interface RequestData {
  fullName: string;
  username: string;
}

const putUserInfo = async (params: RequestData) => {
  const { data } = await authInstance.put('/settings/update-user', params);
  return data;
};

const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: putUserInfo
  });
};

export default useUpdateUserMutation;
