import { SnsApiInstance } from '@/apis/instance';
import { HEADERS_AUTHORIZATION } from '@/apis/sns';
import { UserResponse } from '@common/types/raws';
import { User } from '@common/types';
import parseUser from '@common/utils/parseUser';

const getAuthCheck = async (accessToken: string): Promise<User> => {
  const { data } = await SnsApiInstance<UserResponse | ''>({
    ...HEADERS_AUTHORIZATION(accessToken),
    method: 'GET',
    url: '/auth-user'
  });

  if (!data) throw new Error('인증되지 않은 사용자입니다.');

  return parseUser(data);
};

export default getAuthCheck;
