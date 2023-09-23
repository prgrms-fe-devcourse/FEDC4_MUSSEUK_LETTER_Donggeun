import { User, UserFullName } from '../types';
import { UserResponse } from '../types/raws';

const parseUser = (rawUser: UserResponse): User => {
  let fullNameField;

  try {
    fullNameField = JSON.parse(rawUser.fullName) as UserFullName;
  } catch (err) {}

  return {
    _id: rawUser._id,
    email: rawUser.email,
    username: fullNameField?.username ?? '머쓱이',
    introduce: fullNameField?.introduce ?? `안녕하세요 ${fullNameField?.username ?? '머쓱이'}입니다`,
    slackId: fullNameField?.slackId,
    slackWorkspace: fullNameField?.slackWorkspace,
    image: rawUser.image, // TODO: default image를 binary 데이터로 설정해주기?
    commentCount: rawUser.comments.length,
    postCount: rawUser.posts.length
  };
};

export default parseUser;
