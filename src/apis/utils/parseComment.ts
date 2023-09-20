import { Comment, CommentField } from '@/types';
import { CommentResponse } from '../types';
import parseUser from './parseUser';

const parseComment = (rawComment: CommentResponse): Comment => {
  let commentField;

  try {
    commentField = JSON.parse(rawComment.comment) as CommentField;
  } catch (err) {
    console.error(err);
  }

  return {
    _id: rawComment._id,
    author: parseUser(rawComment.author),
    content: commentField?.content ?? '',
    position: commentField?.position ?? [0, 0],
    nickname: commentField?.nickname || '익명의 머쓱이',
    decorationImageName: commentField?.decorationImageName ?? 'decoration_soju1'
  };
};

export default parseComment;
