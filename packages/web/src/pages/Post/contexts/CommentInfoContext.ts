import { Comment, DecorationType, User } from 'common/types';
import { Dispatch, createContext, useContext } from 'react';

export type CommentInfoAction =
  | {
      type: 'SET_INFO';
      _id: string;
      author: User;
      content: string;
      nickname: string;
      decorationImageName: DecorationType;
    }
  | { type: 'SET_POSITION'; position: [number, number] };

export const CommentInfoContext = createContext<Comment | null>(null);

export const CommentInfoDispatchContext = createContext<Dispatch<CommentInfoAction> | null>(null);

export const useCommentInfoState = () => {
  const state = useContext(CommentInfoContext);
  if (!state) throw new Error('Cannot find CommentInfoProvider');
  return state;
};

export const useCommentInfoDispatch = () => {
  const dispatch = useContext(CommentInfoDispatchContext);
  if (!dispatch) throw new Error('Cannot find CommentInfoProvider');
  return dispatch;
};
