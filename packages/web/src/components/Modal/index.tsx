import { Modal, ModalOverlay, ModalProps, UseDisclosureReturn } from '@chakra-ui/react';

/* ModalContent와 그 하위 요소
 * ModalHeader, ModalCloseButton, ModalBody, ModalFooter를
 * children으로 전달해서 사용
 * 사용하는 컴포넌트에선 useDisclosure 사용
 */
const BasicModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'> & ModalProps) => {
  return (
    <Modal scrollBehavior={'inside'} isOpen={isOpen} onClose={onClose} size="3xl" {...props}>
      <ModalOverlay />
      {children}
    </Modal>
  );
};

export default BasicModal;
