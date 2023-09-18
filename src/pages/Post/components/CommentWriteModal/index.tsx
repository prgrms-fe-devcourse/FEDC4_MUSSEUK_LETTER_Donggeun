import BasicModal from '@/components/Modal';
import {
  Button,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Textarea,
  UseDisclosureReturn,
  VStack
} from '@chakra-ui/react';
import DecorationList from './DecorationList';
import { useState } from 'react';
import { DecorationType } from '@/types';

const CommentWriteModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  const [selectedDeco, setSelectedDeco] = useState<DecorationType | null>(null);

  const handleClose = () => {
    setSelectedDeco(null);
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={handleClose}>
      <ModalContent borderRadius="1rem" p="1.5rem 0.5rem 0.5rem 0.5rem" bgColor="bg01">
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="1rem">
            <Heading>장식을 선택해주세요</Heading>
            <DecorationList selectedDeco={selectedDeco} setSelectedDeco={setSelectedDeco} />
            <Heading>메세지를 작성해주세요</Heading>
            <Textarea
              w="90%"
              h="10rem"
              _placeholder={{ opacity: 1, color: 'gray03' }}
              borderRadius="10px"
              borderColor="gray03"
              mb="1rem"
              bgColor="white"
            />
            <Heading>작성자에게 보여줄 닉네임</Heading>
            <Input
              placeholder="익명의 머쓱이"
              w="90%"
              _placeholder={{ opacity: 1, color: 'gray03' }}
              borderRadius="10px"
              borderColor="gray03"
              bgColor="white"
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} mr="1.5rem">
            돌아가기
          </Button>
          <Button colorScheme="primary">작성하기</Button>
        </ModalFooter>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentWriteModal;
