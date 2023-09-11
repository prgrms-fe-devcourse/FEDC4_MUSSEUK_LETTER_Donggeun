import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';
import type { User } from '@/types';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  user: User;
  token: string;
}

const postLogin = async (params: RequestData) => {
  const { data } = await baseInstance.post('/login', params);
  return data;
};

const useSigninMutation = () => {
  return useMutation<ResponseData, AxiosError, RequestData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // TODO: 임시 코드입니다. 이후에 로그인 토큰 저장 관련 로직 작성시 수정해야 합니다.
      sessionStorage.setItem('token', data.token);
    }
  });
};

export default useSigninMutation;
