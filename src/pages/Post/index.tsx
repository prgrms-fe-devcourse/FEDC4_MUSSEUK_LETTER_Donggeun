import { Box, Heading, VStack, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: postData } = usePostDetailQuery(parseInt(postId ?? '0', 16));
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
            원하는 위치를 클릭해서 {postData?.author.fullName} 님의 머쓱이에게 편지를 남겨주세요.
          </AnnouncementText>
          <ListButton />
        </Box>
        <CommentBoard onOpen={onOpen} />
        <Heading mb="1rem">{postData?.title}</Heading>
        <DescriptionText>
          안녕하세요! 피드백을 받고 싶은 머쓱이 입니다.안녕하세요! 피드백을 받고 싶은 머쓱이 입니다.안녕하세요! 피드백을
          받고 싶은 머쓱이 입니다.안녕하세요! 피드백을 받고 싶은 머쓱이 입니다.안녕하세요! 피드백을 받고 싶은 머쓱이
          입니다.
        </DescriptionText>
      </VStack>
      <CommentWriteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Post;
