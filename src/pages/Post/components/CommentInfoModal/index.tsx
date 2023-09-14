import BasicModal from '@/components/Modal';
import { Box, ModalCloseButton, ModalContent, ModalHeader, ModalProps, UseDisclosureReturn } from '@chakra-ui/react';

const CommentInfoModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'> & ModalProps) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Box>한눈에 보기 모달</Box>
        </ModalHeader>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentInfoModal;
