import { Box, Heading, VStack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AnnouncementText from './components/AnnouncementText';
import ListButton from './components/ListButton';
import DescriptionText from './components/DescriptionText';
import BackgroundHome from '@/assets/images/background_home.png';
import CommentBoard from './components/CommentBoard';
import Header from '@/components/header';
import CommentWriteModal from './components/CommentWriteModal';

const Post = () => {
  const { postId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header userId="frong123" />
      <VStack
        p="2rem 2rem 5rem 2rem"
        backgroundColor="bg01"
        backgroundImage={BackgroundHome}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat">
        <Box w="100%">
          <AnnouncementText mb="1rem">
            원하는 위치를 클릭해서 {postId} 님의 머쓱이에게 편지를 남겨주세요.
          </AnnouncementText>
          <ListButton />
        </Box>
        <CommentBoard onOpen={onOpen} />
        <Heading mb="1rem">{postId}의 머쓱이</Heading>
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
