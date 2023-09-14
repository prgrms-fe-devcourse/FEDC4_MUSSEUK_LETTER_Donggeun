import { Box, UseDisclosureReturn } from '@chakra-ui/react';
import Musseuk from './Musseuk';
import CommentList from './CommentList';
import Comment from './Comment';
import React, { useRef, useState } from 'react';
import { MusseukType } from '@/types';

type CommentBoardProps = {
  musseukImageName: MusseukType;
};

const CommentBoard = ({ musseukImageName, onOpen }: CommentBoardProps & Pick<UseDisclosureReturn, 'onOpen'>) => {
  const [commentPosRatio, setCommentPosRatio] = useState({ x: 0, y: 0 });
  const musseukRef = useRef<HTMLImageElement | null>(null);

  const handleMusseukClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!musseukRef.current) return;

    const { clientX, clientY } = e;
    const { x, y, width, height } = musseukRef.current.getBoundingClientRect();

    setCommentPosRatio({
      x: ((clientX - x) / width) * 100,
      y: ((clientY - y) / height) * 100
    });

    onOpen();
  };

  return (
    <Box position="relative" onClick={handleMusseukClick}>
      <Musseuk ref={musseukRef} musseukImageName={musseukImageName} />
      <CommentList>
        <Comment top={commentPosRatio.y} left={commentPosRatio.x} />
      </CommentList>
    </Box>
  );
};

export default CommentBoard;
