import BasicModal from '@/components/Modal';
import {
  Button,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  UseDisclosureReturn,
  VStack
} from '@chakra-ui/react';
import DecorationList from './DecorationList';

const CommentWriteModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent borderRadius="1rem" p="1.5rem 0.5rem 0.5rem 0.5rem">
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="1rem">
            <Heading>장식을 선택해주세요</Heading>
            <DecorationList />
            <Heading>메세지를 작성해주세요</Heading>
            <Heading>작성자에게 보여줄 닉네임</Heading>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr="1.5rem">
            돌아가기
          </Button>
          <Button colorScheme="primary">작성하기</Button>
        </ModalFooter>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentWriteModal;
