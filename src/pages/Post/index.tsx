import { Box, Heading, VStack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AnnouncementText from './components/AnnouncementText';
import ListButton from './components/ListButton';
import DescriptionText from './components/DescriptionText';
import BackgroundHome from '@/assets/images/background_home.png';
import CommentBoard from './components/CommentBoard';
import CommentWriteModal from './components/CommentWriteModal';
import CommentListModal from './components/CommentListModal';
import CommentInfoModal from './components/CommentInfoModal';

const Post = () => {
  const { postId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();

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
            원하는 위치를 클릭해서 {postId} 님의 머쓱이에게 편지를 남겨주세요.
          </AnnouncementText>
          <ListButton onClick={onInfoOpen} />
          <ListButton onClick={onListOpen} />
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
      <CommentInfoModal isOpen={isInfoOpen} onClose={onInfoClose} />
      <CommentListModal isOpen={isListOpen} onClose={onListClose} />
    </>
  );
};

export default Post;
