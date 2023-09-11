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

const CommentWriteModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Heading>장식을 선택해주세요</Heading>
            <Heading>메세지를 작성해주세요</Heading>
            <Heading>작성자에게 보여줄 닉네임</Heading>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>돌아가기</Button>
          <Button colorScheme="primary">작성하기</Button>
        </ModalFooter>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentWriteModal;
