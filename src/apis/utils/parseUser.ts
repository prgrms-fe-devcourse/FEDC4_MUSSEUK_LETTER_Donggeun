import { User, UserFullName } from '@/types';
import { UserResponse } from '../types';

const parseUser = (rawUser: UserResponse) => {
  const { _id, email, fullName: fullNameJSON, image, posts, comments } = rawUser;

  const { username, introduce } = JSON.parse(fullNameJSON) as UserFullName;

  const user: User = {
    _id,
    email,
    username,
    introduce,
    image,
    postCount: posts.length,
    commentCount: comments.length
  };

  return user;
};

export default parseUser;
