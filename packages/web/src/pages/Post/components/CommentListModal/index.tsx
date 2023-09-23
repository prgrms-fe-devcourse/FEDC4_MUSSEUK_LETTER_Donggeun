import BasicModal from '@/components/Modal';
import commentImage from '@/assets/images/musseuk_hood.png';
import headerImage from '@/assets/images/comment-header.png';
import {
  ModalContent,
  UseDisclosureReturn,
  Accordion,
  Box,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  ModalFooter
} from '@chakra-ui/react';
import AccordionItems from './AccordionItems';
import { Comment } from 'common/types';

const CommentListModal = ({
  isOpen,
  onClose,
  comments
}: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'> & { comments: Comment[] }) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent borderRadius={20} h={'25rem'}>
        <ModalCloseButton size={'lg'} top={3} color={'white'} zIndex={1} />
        <ModalHeader h={'4rem'} p={0} bgImage={headerImage} borderTopLeftRadius={20} borderTopRightRadius={20}>
          <Box w={'100%'} h={'100%'} position={'relative'}>
            <Image
              m={'auto'}
              w={'4rem'}
              h={'4rem'}
              position={'inherit'}
              top={'1rem'}
              alt="comment-header"
              src={commentImage}
            />
          </Box>
        </ModalHeader>
        <ModalBody
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
              borderRadius: '20px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#DDDFDA',
              borderRadius: '20px'
            }
          }}
          pt={'3rem'}
          box-boxsizing="border-box">
          <Accordion allowMultiple>
            {comments.map((comment) => (
              <AccordionItems key={comment._id} nickname={comment.nickname} content={comment.content} />
            ))}
          </Accordion>
        </ModalBody>
        <ModalFooter height={'1rem'} />
      </ModalContent>
    </BasicModal>
  );
};

export default CommentListModal;
