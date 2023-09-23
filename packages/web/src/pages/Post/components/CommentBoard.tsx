import { Box, useToast } from '@chakra-ui/react';
import Musseuk from './Musseuk';
import CommentList from './CommentList';
import Comment from './Comment';
import React, { useEffect, useRef } from 'react';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import { useCommentInfoDispatch } from '../contexts/CommentInfoContext';
import { COMMENT_INFO_ACTION } from '../constants';
import type { Comment as CommentType } from '@common/types';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import qs from 'qs';

type CommentBoardProps = {
  postId: string;
  onInfoOpen: () => void;
  onWriteOpen: () => void;
};

const CommentBoard = ({ postId, onInfoOpen, onWriteOpen }: CommentBoardProps) => {
  const musseukRef = useRef<HTMLImageElement | null>(null);
  const dispatch = useCommentInfoDispatch();
  const toast = useToast();

  const { data: postData } = usePostDetailQuery(postId, { suspense: true });
  const { data: userData } = useAuthCheckQuery({ suspense: true });

  const isAuthor = !!userData && !!postData && userData._id === postData.author._id;
  const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const urlCommentId = queryString.commentId;

  const handleMusseukClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!musseukRef.current) return;

    const { clientX, clientY } = e;
    const { x, y, width, height } = musseukRef.current.getBoundingClientRect();

    const xRatio = ((clientX - x) / width) * 100;
    const yRatio = ((clientY - y) / height) * 100;

    if (xRatio < 0 || xRatio > 100 || yRatio < 0 || yRatio > 100) return;

    dispatch({
      type: COMMENT_INFO_ACTION.POSITION,
      position: [xRatio, yRatio]
    });

    isAuthor || onWriteOpen();
  };

  const handleCommentClick = ({
    _id,
    author,
    content,
    nickname,
    decorationImageName
  }: Omit<CommentType, 'position'>) => {
    const isMyComment = userData?._id === author._id;

    return (e: React.MouseEvent) => {
      e.stopPropagation();

      if (isAuthor || isMyComment) {
        dispatch({ type: COMMENT_INFO_ACTION.INFO, _id, author, content, nickname, decorationImageName });

        onInfoOpen();
      } else {
        toast({
          title: '남의 편지는 볼 수 없어요!',
          status: 'warning',
          position: 'top',
          duration: 3000,
          isClosable: true
        });
      }
    };
  };

  useEffect(() => {
    if (urlCommentId && postData) {
      const comment = postData.comments.find((comment) => comment._id === urlCommentId);
      if (comment) {
        const { _id, author, content, nickname, decorationImageName } = comment;
        const isMyComment = userData?._id === author._id;

        if (isAuthor || isMyComment) {
          dispatch({ type: COMMENT_INFO_ACTION.INFO, _id, author, content, nickname, decorationImageName });
          onInfoOpen();
        }
      }
    }
  }, [dispatch, isAuthor, onInfoOpen, postData, toast, urlCommentId, userData?._id]);

  return (
    <Box
      position="relative"
      onClick={handleMusseukClick}
      border={isAuthor ? 'none' : '4px dashed'}
      borderColor={'green01'}
      boxSizing="border-box"
      mt={{ base: 'min(7.5%, 3rem)', '2xl': '0' }}
      mb={'min(7.5%, 3rem)'}
      cursor={isAuthor ? 'default' : 'pointer'}>
      <Musseuk ref={musseukRef} musseukImageName={postData?.musseukImageName ?? 'musseuk_default'} />
      <CommentList>
        {postData &&
          postData.comments.map(({ _id, author, content, position, nickname, decorationImageName }) => (
            <Comment
              key={_id}
              top={position[1]}
              left={position[0]}
              decorationImageName={decorationImageName}
              onClick={handleCommentClick({ _id, author, content, nickname, decorationImageName })}
              cursor={isAuthor || author._id === userData?._id ? 'pointer' : 'default'}
            />
          ))}
      </CommentList>
    </Box>
  );
};

export default CommentBoard;
