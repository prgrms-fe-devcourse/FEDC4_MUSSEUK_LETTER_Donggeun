import { Comment, CommentField } from '@/types';
import { CommentResponse } from '../types';

const parseComment = (rawComment: CommentResponse) => {
  const { _id, comment: commentJSON } = rawComment;

  const { content, pos, nickname, decorationImageName } = JSON.parse(commentJSON) as CommentField;

  const comment: Comment = {
    _id,
    content,
    pos,
    nickname,
    decorationImageName
  };

  return comment;
};

export default parseComment;
