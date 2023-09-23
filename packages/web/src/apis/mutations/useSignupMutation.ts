import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import type { UserFullName } from '@common/types';
import { UserResponse } from '@common/types/raws';
import parseUser from '@common/utils/parseUser';

interface CustomRequestData {
  email: string;
  password: string;
  username: string; // 사용자 실명
}

interface RequestData {
  email: string;
  fullName: string;
  password: string;
}

interface ResponseData {
  user: UserResponse;
  token: string;
}

const postSignup = async (customParams: CustomRequestData) => {
  const fullName: UserFullName = {
    username: customParams.username,
    introduce: `안녕하세요 ${customParams.username}입니다.`
  };

  const params: RequestData = {
    email: customParams.email,
    password: customParams.password,
    fullName: JSON.stringify(fullName)
  };

  const { data } = await baseInstance.post<ResponseData>('/signup', params);

  return data;
};

const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, AxiosError, CustomRequestData>({
    mutationFn: postSignup,
    onSuccess: (data) => {
      storage('local').setItem(AUTH_TOKEN, data.token);
      queryClient.setQueryData(queryKey.auth, parseUser(data.user));
    }
  });
};

export default useSignupMutation;
