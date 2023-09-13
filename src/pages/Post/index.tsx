import { Box, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AnnouncementText from './components/AnnouncementText';
import ListButton from './components/ListButton';
import DescriptionText from './components/DescriptionText';
import BackgroundHome from '@/assets/images/background_home.png';
import CommentBoard from './components/CommentBoard';
import CommentWriteModal from './components/CommentWriteModal';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';

const Post = () => {
  const { postId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: postData } = usePostDetailQuery(postId ?? '');
  const { data: userData } = useAuthCheckQuery();

  const isAuthor = !!userData && !!postData && userData._id === postData.author._id;

  return (
    <>
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
              `원하는 위치를 클릭해서 ${postData?.author.username} 님의 머쓱이에게 편지를 남겨주세요.`
            )}
          </AnnouncementText>
          {isAuthor && <ListButton />}
        </Box>
        <CommentBoard onOpen={onOpen} />
        <Heading mb="1rem">{postData?.title}</Heading>
        <DescriptionText>{postData?.content}</DescriptionText>
      </VStack>
      <CommentWriteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Post;
