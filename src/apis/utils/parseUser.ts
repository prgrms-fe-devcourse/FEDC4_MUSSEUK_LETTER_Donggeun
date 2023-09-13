import { User, customUserFullName } from '@/types';
import { UserResponse } from '../types';

const parseUser = (rawUser: UserResponse) => {
  const { _id, email, fullName: fullNameJSON, image } = rawUser;

  const { username, nickname, introduce } = JSON.parse(fullNameJSON) as customUserFullName;

  const customUser: User = {
    _id,
    email,
    username,
    nickname,
    introduce,
    image
  };

  return customUser;
};

export default parseUser;
