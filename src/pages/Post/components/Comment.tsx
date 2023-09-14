import { Box, Image } from '@chakra-ui/react';
import DecorationSoju1 from '@/assets/images/decoration_soju1.png';
import React from 'react';
import { CommentField } from '@/types';

type CommentType = {
  top: number;
  left: number;
} & Omit<CommentField, 'pos'>;

const Comment = ({ top = 0, left = 0, content, nickname, decorationImageName }: CommentType) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box position="absolute" top={`${top}%`} left={`${left}%`} w="10%" h="10%">
      <Image src={DecorationSoju1} alt="soju" position="absolute" top="-50%" left="-50%" onClick={handleClick} />
    </Box>
  );
};

export default Comment;
