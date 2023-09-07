import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { baseInstance } from '@/apis/instance';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  user: unknown; // TODO: 임시로 unknown으로 설정했습니다.
  token: string;
}

const postLogin = async (params: RequestData) => {
  const { data } = await baseInstance.post('/login', params);
  return data;
};

const useLoginMutation = () => {
  return useMutation<ResponseData, AxiosError, RequestData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // TODO: 임시 코드입니다. 이후에 로그인 토큰 저장 관련 로직 작성시 수정해야 합니다.
      sessionStorage.setItem('token', data.token);
    }
  });
};

export default useLoginMutation;
