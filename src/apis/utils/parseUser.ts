import { User, UserFullName } from '@/types';
import { UserResponse } from '../types';

const parseUser = (rawUser: UserResponse) => {
  const { _id, email, fullName: fullNameJSON, image, posts, comments } = rawUser;

  let fullNameData: UserFullName;
  try {
    fullNameData = JSON.parse(fullNameJSON) as UserFullName;
  } catch (err) {
    if (err instanceof SyntaxError) {
      fullNameData = {
        username: '머쓱이',
        introduce: '안녕하세요 머쓱이입니다'
      };
    } else {
      throw err;
    }
  }

  const { username, introduce = `안녕하세요 ${username}입니다`, slackId, slackWorkspace } = fullNameData;

  const user: User = {
    _id,
    email,
    username,
    introduce,
    slackId,
    slackWorkspace,
    // TODO: default image를 binary 데이터로 설정해주기?
    image,
    postCount: posts.length,
    commentCount: comments.length
  };

  return user;
};

export default parseUser;
