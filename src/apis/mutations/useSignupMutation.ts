import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import type { User } from '@/types';

interface CustomRequestData {
  email: string;
  password: string;
  username: string; // 사용자 실명
  introduce?: string;
}

interface RequestData {
  email: string;
  fullName: string;
  password: string;
}

interface ResponseData {
  user: User;
  token: string;
}

const postSignup = async (customParams: CustomRequestData) => {
  const params: RequestData = {
    email: customParams.email,
    password: customParams.password,
    fullName: JSON.stringify({
      username: customParams.username,
      introduce: customParams.introduce ?? ''
    })
  };

  const { data } = await baseInstance.post('/signup', params);
  return data;
};

const useSignupMutation = () => {
  return useMutation<ResponseData, AxiosError, CustomRequestData>({
    mutationFn: postSignup,
    onSuccess: (data) => storage('session').setItem(AUTH_TOKEN, data.token)
  });
};

export default useSignupMutation;
