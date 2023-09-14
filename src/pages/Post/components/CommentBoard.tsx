import { Box, UseDisclosureReturn } from '@chakra-ui/react';
import Musseuk from './Musseuk';
import CommentList from './CommentList';
import Comment from './Comment';
import React, { useRef, useState } from 'react';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';

type CommentBoardProps = {
  postId: string;
};

const CommentBoard = ({ postId, onOpen }: CommentBoardProps & Pick<UseDisclosureReturn, 'onOpen'>) => {
  const [commentPosRatio, setCommentPosRatio] = useState({ x: 0, y: 0 });
  const musseukRef = useRef<HTMLImageElement | null>(null);
  const { data } = usePostDetailQuery(postId);

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
      <Musseuk ref={musseukRef} musseukImageName={data?.musseukImageName ?? 'musseuk_default'} />
      <CommentList>
        {data &&
          data.comments.map(({ _id, content, pos, nickname, decorationImageName }) => (
            <Comment
              key={_id}
              top={pos[1]}
              left={pos[0]}
              content={content}
              nickname={nickname}
              decorationImageName={decorationImageName}
            />
          ))}
      </CommentList>
    </Box>
  );
};

export default CommentBoard;
