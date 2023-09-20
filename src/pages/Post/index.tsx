import { Box, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import AnnouncementText from './components/AnnouncementText';
import ListButton from './components/ListButton';
import DescriptionText from './components/DescriptionText';
import BackgroundHome from '@/assets/images/background_home.png';
import CommentBoard from './components/CommentBoard';
import CommentWriteModal from './components/CommentWriteModal';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import CommentListModal from './components/CommentListModal';
import CommentInfoModal from './components/CommentInfoModal';
import { CommentInfoProvider } from './contexts/CommentInfoProvider';

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
          <AnnouncementText mb="1rem">
            {isAuthor ? (
              <>
                {postData?.author.username} 님에게{' '}
                <Text display="inline" color="red.400">
                  {postData?.comments.length}
                </Text>
                개의 편지가 전달됐어요!
              </>
            ) : (
              <>
                원하는{' '}
                <Text display={'inline'} color={'green03'}>
                  위치
                </Text>
                를 클릭해서 {postData?.author.username} 님의 머쓱이에게 편지를 남겨주세요.
              </>
            )}
          </AnnouncementText>
          {isAuthor && <ListButton onClick={onListOpen} />}
        </Box>
        <CommentBoard onInfoOpen={onInfoOpen} onWriteOpen={onWriteOpen} postId={postId} isAuthor={isAuthor} />
        <Heading mb="1rem">{postData?.title}</Heading>
        <DescriptionText>{postData?.content}</DescriptionText>
      </VStack>
      <CommentWriteModal isOpen={isWriteOpen} onClose={onWriteClose} postId={postId} />
      <CommentInfoModal isOpen={isInfoOpen} onClose={onInfoClose} />
      <CommentListModal isOpen={isListOpen} onClose={onListClose} comments={postData?.comments ?? []} />
    </CommentInfoProvider>
  );
};

export default Post;
