import BasicModal from '@/components/Modal';
import {
  Image,
  Box,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  UseDisclosureReturn,
  ModalBody,
  Text,
  VStack
} from '@chakra-ui/react';
import headerImage from '@/assets/images/comment-header.png';
import { useCommentInfoState } from '../../contexts/CommentInfoContext';
import { DECORATION_IMAGE } from '../../constants';

const CommentInfoModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  const { content, nickname, decorationImageName } = useCommentInfoState();

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent borderRadius={20}>
        <ModalCloseButton size={'lg'} top={3} color={'white'} zIndex={1} />
        <ModalHeader h={'4rem'} p={0} bgImage={headerImage} borderTopLeftRadius={20} borderTopRightRadius={20}>
          <Box w={'100%'} h={'100%'} position={'relative'}>
            <Image
              m={'auto'}
              w={'3rem'}
              h={'4rem'}
              position={'inherit'}
              top={'2rem'}
              alt="comment-header"
              src={DECORATION_IMAGE[decorationImageName]}
            />
          </Box>
        </ModalHeader>
        <ModalBody p={'3rem'}>
          <VStack gap={6} alignItems={'end'}>
            <Box w={'100%'} minH={'14rem'} borderRadius={6} p={'1.5rem'} bg={'bg01'}>
              <Text lineHeight={'150%'}>{content}</Text>
            </Box>
            <Text textAlign={'right'} fontWeight={'bold'} fontSize={'xl'}>
              From. {nickname}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentInfoModal;
