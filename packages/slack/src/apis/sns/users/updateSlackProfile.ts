import { SnsApiInstance } from '@/apis/instance';
import { SlackWorkspace, UserFullName } from 'common/types';
import { HEADERS_AUTHORIZATION } from '@/apis/sns';

interface Props {
  accessToken: string;
  fullName: UserFullName;
  slackId: string;
  slackWorkspace: SlackWorkspace;
}

const updateSlackProfile = async ({ accessToken, fullName, slackId, slackWorkspace }: Props) => {
  const data = {
    introduce: fullName.introduce,
    username: fullName.username,
    slackId,
    slackWorkspace
  } satisfies UserFullName;

  return await SnsApiInstance({
    ...HEADERS_AUTHORIZATION(accessToken),
    method: 'PUT',
    url: '/settings/update-user',
    data: {
      username: fullName.username,
      fullName: JSON.stringify(data)
    }
  });
};

export default updateSlackProfile;
