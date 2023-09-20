import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import parseUser from '../utils/parseUser';
import { UserResponse } from '../types';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  user: UserResponse;
  token: string;
}

const postLogin = async (params: RequestData) => {
  const { data } = await baseInstance.post<ResponseData>('/login', params);

  return data;
};

const useSigninMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, AxiosError, RequestData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      storage('session').setItem(AUTH_TOKEN, data.token);
      queryClient.setQueryData(queryKey.auth, parseUser(data.user));
    }
  });
};

export default useSigninMutation;
