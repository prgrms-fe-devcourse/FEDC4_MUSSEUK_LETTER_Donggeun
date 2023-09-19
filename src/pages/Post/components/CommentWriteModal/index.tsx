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
  VStack,
  useToast
} from '@chakra-ui/react';
import DecorationList from './DecorationList';
import { CommentField } from '@/types';
import { useCommentInfoState } from '../../contexts/CommentInfoContext';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useWriteCommentMutation from '@/apis/mutations/useWriteCommentMutation';
import { useState } from 'react';

type CommentWriteModalProps = {
  postId: string;
} & Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>;

const CommentWriteModal = ({ isOpen, onClose, postId }: CommentWriteModalProps) => {
  const [isDecorationError, setIsDecorationError] = useState(false);
  const { position } = useCommentInfoState();
  const toast = useToast();

  const { mutate } = useWriteCommentMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isSubmitted, errors }
  } = useForm<CommentField>();

  const onSubmit: SubmitHandler<CommentField> = (data) => {
    mutate(
      {
        content: data.content,
        position,
        nickname: data.nickname,
        decorationImageName: data.decorationImageName,
        postId
      },
      {
        onSuccess: () => {
          toast({
            title: '메세지가 작성되었어요!',
            status: 'success',
            position: 'top'
          });
          handleClose();
        },
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          toast({
            title: errorMessage,
            status: 'error',
            position: 'top'
          });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<CommentField> = (errors) => setIsDecorationError(!!errors.decorationImageName);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={handleClose}>
      <ModalContent borderRadius="1rem" p="1.5rem 0.5rem 0.5rem 0.5rem" bgColor="bg01">
        <ModalCloseButton />
        <ModalBody>
          <form id="write" onSubmit={handleSubmit(onSubmit, onError)}>
            <VStack spacing="1rem">
              <Heading textColor={isDecorationError ? 'orange.400' : 'black01'}>장식을 선택해주세요</Heading>
              <DecorationList
                {...register('decorationImageName', { required: true })}
                isError={isDecorationError}
                setValue={setValue}
                setIsError={setIsDecorationError}
              />
              <Heading textColor={errors.content ? 'orange.400' : 'black01'}>메세지를 작성해주세요</Heading>
              <Textarea
                aria-invalid={isSubmitted ? !!errors.content : undefined}
                {...register('content', {
                  required: true
                })}
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
                {...register('nickname')}
                placeholder="익명의 머쓱이"
                w="90%"
                _placeholder={{ opacity: 1, color: 'gray03' }}
                borderRadius="10px"
                borderColor="gray03"
                bgColor="white"
              />
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} mr="1.5rem">
            돌아가기
          </Button>
          <Button type="submit" form="write" colorScheme="primary" disabled={isSubmitting}>
            작성하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </BasicModal>
  );
};

export default CommentWriteModal;
