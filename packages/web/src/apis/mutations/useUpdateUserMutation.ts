import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from '../instance';
import { AxiosError } from 'axios';
import { UserFullName, SlackWorkspace } from 'common/types';

interface RequestData {
  //api에 보내는 데이터
  fullName: string;
  username: string;
}

interface CustomRequestData {
  //api에 보내기전에 가공데이터
  username: string;
  introduce: string;
  slackId?: string;
  slackWorkspace?: SlackWorkspace;
}

const putUserInfo = async (customRequestData: CustomRequestData) => {
  const params: RequestData = {
    fullName: JSON.stringify({
      username: customRequestData.username,
      introduce: customRequestData.introduce ?? '',
      slackId: customRequestData.slackId,
      slackWorkspace: customRequestData.slackWorkspace
    } satisfies UserFullName),
    username: customRequestData.username
  };

  const { data } = await authInstance.put('/settings/update-user', params);
  return data;
};

const useUpdateUserMutation = () => {
  return useMutation<unknown, AxiosError, CustomRequestData>({
    mutationFn: putUserInfo
  });
};

export default useUpdateUserMutation;
