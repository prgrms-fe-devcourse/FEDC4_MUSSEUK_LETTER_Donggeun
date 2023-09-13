import { Comment, customCommentComment } from '@/types';
import { CommentResponse } from '../types';

const parseComment = (rawComment: CommentResponse) => {
  const { _id, comment: commentJSON } = rawComment;

  const { content, pos, nickname } = JSON.parse(commentJSON) as customCommentComment;

  const customComment: Comment = {
    _id,
    content,
    pos,
    nickname
  };

  return customComment;
};

export default parseComment;
