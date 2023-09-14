import BasicModal from '@/components/Modal';
import { ModalContent, UseDisclosureReturn } from '@chakra-ui/react';

const CommentListModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent></ModalContent>
    </BasicModal>
  );
};

export default CommentListModal;
