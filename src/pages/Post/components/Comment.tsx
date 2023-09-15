import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { CommentField } from '@/types';
import { useCommentInfoDispatch } from '../contexts/CommentInfoContext';
import { COMMENT_INFO_ACTION, DECORATION_IMAGE } from '../constants';

type CommentType = {
  top: number;
  left: number;
} & Omit<CommentField, 'position'>;

const Comment = ({ top = 0, left = 0, content, nickname, decorationImageName }: CommentType) => {
  const dispatch = useCommentInfoDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({ type: COMMENT_INFO_ACTION.CONTENT, content });
    dispatch({ type: COMMENT_INFO_ACTION.NICKNAME, nickname });
    dispatch({ type: COMMENT_INFO_ACTION.DECORATION, decorationImageName });
  };

  return (
    <Box position="absolute" top={`${top}%`} left={`${left}%`} w="10%" h="10%">
      <Image
        src={DECORATION_IMAGE[decorationImageName]}
        alt={decorationImageName}
        position="absolute"
        top="-50%"
        left="-50%"
        onClick={handleClick}
      />
    </Box>
  );
};

export default Comment;
