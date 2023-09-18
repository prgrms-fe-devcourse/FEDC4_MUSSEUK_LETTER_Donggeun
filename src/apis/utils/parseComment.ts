import { Comment, CommentField } from '@/types';
import { CommentResponse } from '../types';

const parseComment = (rawComment: CommentResponse) => {
  const { _id, comment: commentJSON } = rawComment;

  let commentData: CommentField;
  try {
    commentData = JSON.parse(commentJSON) as CommentField;
  } catch (err) {
    if (err instanceof SyntaxError) {
      commentData = {
        content: '',
        position: [0, 0],
        nickname: '익명의 머쓱이',
        decorationImageName: 'decoration_soju1'
      };
    } else {
      throw err;
    }
  }

  const {
    content = '',
    position = [0, 0],
    nickname = '익명의 머쓱이',
    decorationImageName = 'decoration_soju1'
  } = commentData;

  const comment: Comment = {
    _id,
    content,
    position,
    nickname,
    decorationImageName
  };

  return comment;
};

export default parseComment;
