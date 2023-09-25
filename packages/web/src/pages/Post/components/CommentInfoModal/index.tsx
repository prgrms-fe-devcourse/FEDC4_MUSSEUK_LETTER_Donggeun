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
  VStack,
  Flex,
  useToast
} from '@chakra-ui/react';
import headerImage from '@/assets/images/comment-header.png';
import { useCommentInfoState } from '../../contexts/CommentInfoContext';
import { DECORATION_IMAGE } from '../../constants';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import DeleteButton from '../DeleteButton';
import { useState } from 'react';
import useDeleteCommentMutation from '@/apis/mutations/useDeleteCommentMutation';
import DeleteConfirmText from './DeleteConfirmText';

const CommentInfoModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const { content, nickname, decorationImageName, author, _id: commentId } = useCommentInfoState();
  const toast = useToast();

  const { data: userData } = useAuthCheckQuery();
  const { mutate, isLoading } = useDeleteCommentMutation(commentId);

  const isMyComment = userData?._id === author._id;

  const handleDeleteClick = () => {
    if (isDeleteConfirm) {
      mutate(
        { commentId },
        {
          onSuccess: () => {
            toast({
              title: '편지가 삭제됐어요.',
              status: 'success',
              position: 'top'
            });

            handleCloseClick();
          }
        }
      );
    } else {
      setIsDeleteConfirm(true);
    }
  };

  const handleDeleteCancelClick = () => {
    setIsDeleteConfirm(false);
  };

  const handleCloseClick = () => {
    setIsDeleteConfirm(false);
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={handleCloseClick}>
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
              src={DECORATION_IMAGE[decorationImageName]}
            />
          </Box>
        </ModalHeader>
        <ModalBody p={'3rem'}>
          <VStack gap={6} alignItems={'end'}>
            <Box w={'100%'} minH={'14rem'} borderRadius={6} p={'1.5rem'} bg={'bg01'}>
              <Text lineHeight={'150%'} fontSize={18} whiteSpace={'pre-wrap'}>
                {content}
              </Text>
            </Box>
            <Flex w={'100%'} justifyContent={'space-between'}>
              {isMyComment && (
                <Flex alignItems={'center'}>
                  <DeleteButton
                    onClick={handleDeleteClick}
                    isLoading={isLoading}
                    mr={3}
                    colorScheme={isDeleteConfirm ? 'red' : 'primary'}
                  />
                  {isDeleteConfirm && (
                    <DeleteConfirmText
                      display={{ base: 'none', md: 'inline' }}
                      onCancelClick={handleDeleteCancelClick}
                    />
                  )}
                </Flex>
              )}
              <Text textAlign={'right'} fontWeight={'bold'} fontSize={'xl'} alignSelf={'center'} ml={'auto'}>
                From. {nickname}
              </Text>
            </Flex>
            {isDeleteConfirm && (
              <DeleteConfirmText
                display={{ base: 'block', md: 'none' }}
                alignSelf={'baseline'}
                onCancelClick={handleDeleteCancelClick}
              />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentInfoModal;
