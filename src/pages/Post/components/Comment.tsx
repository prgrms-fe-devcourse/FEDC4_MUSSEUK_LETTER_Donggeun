import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { DecorationType } from '@/types';
import { DECORATION_IMAGE } from '../constants';

type CommentType = {
  top: number;
  left: number;
  decorationImageName: DecorationType;
  onClick: (e: React.MouseEvent) => void;
};

const Comment = ({ top = 0, left = 0, decorationImageName, onClick }: CommentType) => {
  return (
    <Box position="absolute" top={`${top}%`} left={`${left}%`} w="15%" h="15%">
      <Image
        src={DECORATION_IMAGE[decorationImageName]}
        alt={decorationImageName}
        position="relative"
        top="-50%"
        left="-50%"
        boxSize={'100%'}
        objectFit={'contain'}
        onClick={onClick}
      />
    </Box>
  );
};

export default Comment;
