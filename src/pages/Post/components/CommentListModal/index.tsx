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

const CommentListModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  const mockData = [
    {
      _id: '1',
      nickname: '익명1',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    },
    {
      _id: '2',
      nickname: '익명2',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    },
    {
      _id: '3',
      nickname: '익명3',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    },
    {
      _id: '4',
      nickname: '익명4',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    },
    {
      _id: '5',
      nickname: '익명5',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    },
    {
      _id: '6',
      nickname: '익명6',
      content:
        '딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요. 딥다이브 잘 들었습니다!! 많은 도움이 되었어요.'
    }
  ];
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
          box-boxSizing="border-box"
          overflowY={'auto'}>
          <Accordion allowMultiple>
            {mockData.map((comment) => (
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
