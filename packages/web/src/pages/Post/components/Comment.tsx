import { Box, Image, ImageProps } from '@chakra-ui/react';
import React from 'react';
import { DecorationType } from 'common/types';
import { DECORATION_IMAGE } from '../constants';

type CommentType = {
  top: number;
  left: number;
  decorationImageName: DecorationType;
  onClick: (e: React.MouseEvent) => void;
} & ImageProps;

const Comment = ({ top = 0, left = 0, decorationImageName, onClick, ...props }: CommentType) => {
  return (
    <Box position="absolute" top={`${top}%`} left={`${left}%`} w="7.5%" h="7.5%">
      <Image
        src={DECORATION_IMAGE[decorationImageName]}
        alt={decorationImageName}
        position="relative"
        top="-100%"
        left="-100%"
        w={'200%'}
        h={'200%'}
        maxW={'none'}
        objectFit={'contain'}
        onClick={onClick}
        zIndex={5}
        {...props}
      />
    </Box>
  );
};

export default Comment;
