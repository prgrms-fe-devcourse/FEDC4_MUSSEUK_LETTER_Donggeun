import { CommentField, DecorationType } from '@/types';
import { Dispatch, createContext, useContext } from 'react';

export type CommentInfoAction =
  | { type: 'SET_CONTENT'; content: string }
  | { type: 'SET_POSITION'; position: [number, number] }
  | { type: 'SET_NICKNAME'; nickname: string }
  | { type: 'SET_DECORATION_IMAGE_NAME'; decorationImageName: DecorationType };

export const CommentInfoContext = createContext<CommentField | null>(null);

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
