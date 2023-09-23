import { Comment } from '@common/types';
import React, { useReducer } from 'react';
import { COMMENT_INFO_ACTION } from '../constants';
import { CommentInfoAction, CommentInfoContext, CommentInfoDispatchContext } from './CommentInfoContext';

const initialCommentInfo: Comment = {
  _id: '',
  content: '',
  position: [0, 0],
  nickname: '익명의 머쓱이',
  decorationImageName: 'decoration_soju1',
  author: {
    _id: '',
    email: '',
    image: '',
    postCount: 0,
    commentCount: 0,
    username: '',
    introduce: ''
  }
};

export const CommentInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(commentInfoReducer, initialCommentInfo);

  return (
    <CommentInfoContext.Provider value={state}>
      <CommentInfoDispatchContext.Provider value={dispatch}>{children}</CommentInfoDispatchContext.Provider>
    </CommentInfoContext.Provider>
  );
};

const commentInfoReducer = (state: Comment, action: CommentInfoAction): Comment => {
  switch (action.type) {
    case COMMENT_INFO_ACTION.INFO:
      return {
        ...state,
        _id: action._id,
        author: action.author,
        content: action.content,
        nickname: action.nickname,
        decorationImageName: action.decorationImageName
      };
    case COMMENT_INFO_ACTION.POSITION:
      return {
        ...state,
        position: action.position
      };
    default:
      throw new Error('Unhandled action');
  }
};
