import { Box } from '@chakra-ui/react';
import Musseuk from './Musseuk';
import CommentList from './CommentList';
import Comment from './Comment';
import React, { useRef } from 'react';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import { useCommentInfoDispatch } from '../contexts/CommentInfoContext';
import { COMMENT_INFO_ACTION } from '../constants';
import { CommentField } from '@/types';

type CommentBoardProps = {
  postId: string;
  onInfoOpen: () => void;
  onWriteOpen: () => void;
};

const CommentBoard = ({ postId, onInfoOpen, onWriteOpen }: CommentBoardProps) => {
  const musseukRef = useRef<HTMLImageElement | null>(null);
  const { data } = usePostDetailQuery(postId);
  const dispatch = useCommentInfoDispatch();

  const handleMusseukClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!musseukRef.current) return;

    const { clientX, clientY } = e;
    const { x, y, width, height } = musseukRef.current.getBoundingClientRect();

    const xRatio = ((clientX - x) / width) * 100;
    const yRatio = ((clientY - y) / height) * 100;

    dispatch({
      type: COMMENT_INFO_ACTION.POSITION,
      position: [xRatio, yRatio]
    });

    onWriteOpen();
  };

  const handleCommentClick = ({ content, nickname, decorationImageName }: Omit<CommentField, 'position'>) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();

      dispatch({ type: COMMENT_INFO_ACTION.CONTENT, content });
      dispatch({ type: COMMENT_INFO_ACTION.NICKNAME, nickname });
      dispatch({ type: COMMENT_INFO_ACTION.DECORATION, decorationImageName });

      onInfoOpen();
    };
  };

  return (
    <Box position="relative" onClick={handleMusseukClick}>
      <Musseuk ref={musseukRef} musseukImageName={data?.musseukImageName ?? 'musseuk_default'} />
      <CommentList>
        {data &&
          data.comments.map(({ _id, content, position, nickname, decorationImageName }) => (
            <Comment
              key={_id}
              top={position[1]}
              left={position[0]}
              decorationImageName={decorationImageName}
              onClick={handleCommentClick({ content, nickname, decorationImageName })}
            />
          ))}
      </CommentList>
    </Box>
  );
};

export default CommentBoard;
