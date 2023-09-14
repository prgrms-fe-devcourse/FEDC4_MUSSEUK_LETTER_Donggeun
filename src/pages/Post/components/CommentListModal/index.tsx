import BasicModal from '@/components/Modal';
import { ModalContent, ModalProps, UseDisclosureReturn } from '@chakra-ui/react';

const CommentListModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'> & ModalProps) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent></ModalContent>
    </BasicModal>
  );
};

export default CommentListModal;
