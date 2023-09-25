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
  Button,
  HStack,
  Flex,
  useToast
} from '@chakra-ui/react';
import headerImage from '@/assets/images/comment-header.png';
import musseukBye from '@/assets/images/musseuk_bye.png';
import useDeletePostMutation from '@/apis/mutations/useDeletePostMutation';
import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import { useNavigate } from 'react-router-dom';

type PostDeleteModalProps = {
  postId: string;
} & Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>;

const PostDeleteModal = ({ isOpen, onClose, postId }: PostDeleteModalProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { data } = usePostDetailQuery(postId);
  const { mutate, isLoading } = useDeletePostMutation(postId);

  const handleDeleteClick = () => {
    mutate(
      { postId },
      {
        onSuccess: () => {
          toast({
            title: '머쓱이가 결국 떠났어요.',
            status: 'success',
            position: 'top'
          });

          navigate('/');
        }
      }
    );
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <ModalContent borderRadius={20}>
        <ModalCloseButton size={'lg'} top={3} color={'white'} zIndex={1} />
        <ModalHeader
          h={'4rem'}
          p={0}
          bg={`rgba(230, 40, 70, 0.6) url(${headerImage})`}
          backgroundBlendMode={'luminosity'}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <Box w={'100%'} h={'100%'} position={'relative'}>
            <Image
              m={'auto'}
              w={'4.5rem'}
              h={'4rem'}
              position={'inherit'}
              top={'2rem'}
              alt="delete-header"
              src={musseukBye}
            />
          </Box>
        </ModalHeader>
        <ModalBody p={'3rem'}>
          <VStack gap={6} alignItems={'end'}>
            <Box w={'100%'} minH={'6rem'} borderRadius={6} p={'1.5rem'} bg={'bg01'}>
              <Text lineHeight={'150%'} fontSize={18} display={'inline'}>
                정말로 저를{' '}
              </Text>
              <Text lineHeight={'150%'} fontSize={24} display={'inline'} textColor={'red01'}>
                삭제
              </Text>
              <Text lineHeight={'150%'} fontSize={18} display={'inline'}>
                하시겠어요?
              </Text>
              <Text lineHeight={'150%'} fontSize={18}>
                삭제하시면 받은 메세지도 모두 사라지고 되돌릴 수 없어요.
              </Text>
            </Box>
            <Flex justifyContent={'space-between'} w={'100%'}>
              <Text fontWeight={'bold'} fontSize={'xl'}>
                From. {data?.title ?? '머쓱이'}
              </Text>
              <HStack gap={6}>
                <Button colorScheme={'gray'} size={'lg'} onClick={onClose}>
                  취소
                </Button>
                <Button
                  colorScheme={'red'}
                  size={'lg'}
                  onClick={handleDeleteClick}
                  isLoading={isLoading}
                  loadingText={'삭제 중..'}>
                  삭제
                </Button>
              </HStack>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </BasicModal>
  );
};

export default PostDeleteModal;
