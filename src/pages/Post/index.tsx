import { Box, SkeletonText, VStack, useDisclosure } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import AnnouncementText from './components/AnnouncementText';
import ListButton from './components/ListButton';
import BackgroundHome from '@/assets/images/background_home.png';
import CommentBoard from './components/CommentBoard';
import CommentWriteModal from './components/CommentWriteModal';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import CommentListModal from './components/CommentListModal';
import CommentInfoModal from './components/CommentInfoModal';
import { CommentInfoProvider } from './contexts/CommentInfoProvider';
import { Suspense } from 'react';
import Introduction from './components/Introduction';
import IntroductionSkeleton from './components/Skeletons/IntroductionSkeleton';
import CommentBoardSkeleton from './components/Skeletons/CommentBoardSkeleton';

const links = {
  notFound: '/notFound',
  signin: '/signin'
};

const Post = () => {
  const { postId = '' } = useParams();

  const { isOpen: isWriteOpen, onOpen: onWriteOpen, onClose: onWriteClose } = useDisclosure();
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();

  const { data: postData, isError: isPostError } = usePostDetailQuery(postId);
  const { data: userData, isError: isUserError } = useAuthCheckQuery();

  const isAuthor = !!userData && !!postData && userData._id === postData.author._id;

  if (isUserError) return <Navigate to={links.signin} />;

  if (isPostError) return <Navigate to={links.notFound} />;

  return (
    <CommentInfoProvider>
      <VStack
        p="2rem 2rem 5rem 2rem"
        backgroundColor="bg01"
        backgroundImage={BackgroundHome}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat">
        <Box w="100%">
          <Suspense fallback={<SkeletonText noOfLines={2} skeletonHeight={'2rem'} maxW={'45rem'} />}>
            <AnnouncementText postId={postId} mb="1rem" />
            {isAuthor && <ListButton onClick={onListOpen} />}
          </Suspense>
        </Box>
        <Suspense fallback={<CommentBoardSkeleton />}>
          <CommentBoard onInfoOpen={onInfoOpen} onWriteOpen={onWriteOpen} postId={postId} />
        </Suspense>
        <Suspense fallback={<IntroductionSkeleton />}>
          <Introduction postId={postId} />
        </Suspense>
      </VStack>
      <CommentWriteModal isOpen={isWriteOpen} onClose={onWriteClose} postId={postId} />
      <CommentInfoModal isOpen={isInfoOpen} onClose={onInfoClose} />
      <CommentListModal isOpen={isListOpen} onClose={onListClose} comments={postData?.comments ?? []} />
    </CommentInfoProvider>
  );
};

export default Post;
