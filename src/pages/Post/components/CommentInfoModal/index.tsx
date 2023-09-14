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
import decoImage from '@/assets/images/decoration_soju1.png';
const CommentInfoModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
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
              src={decoImage}
            />
          </Box>
        </ModalHeader>
        <ModalBody p={'3rem'}>
          <VStack gap={6} alignItems={'end'}>
            <Box minH={'14rem'} borderRadius={6} p={'1.5rem'} bg={'bg01'}>
              <Text lineHeight={'150%'}>
                안녕 프롱아...디자인 너무 고생했어. 미안해 내가 디자인 감각이 없어서 도움을 줄 수 없어서 그래서 옆에서
                응원만 했단다. 하지만 너의 디자인 감각 나는 좋은 것 같아 그니까 자신감 가져!!!!
              </Text>
            </Box>
            <Text textAlign={'right'} fontWeight={'bold'} fontSize={'xl'}>
              From. 익명의 머쓱이
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentInfoModal;
