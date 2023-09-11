import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';

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
  user: unknown; // TODO: 임시로 unknown으로 설정했습니다.
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
    onSuccess: (data) => {
      // TODO: 임시 코드입니다. 이후에 로그인 토큰 저장 관련 로직 작성시 수정해야 합니다.
      sessionStorage.setItem('token', data.token);
    }
  });
};

export default useSignupMutation;
