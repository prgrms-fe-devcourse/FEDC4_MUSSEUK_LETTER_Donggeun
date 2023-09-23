import { SmallCloseIcon } from '@chakra-ui/icons';
import { IconButton, Text, TextProps } from '@chakra-ui/react';

type DeleteConfirmTextProps = {
  onCancelClick: () => void;
} & TextProps;

const DeleteConfirmText = ({ onCancelClick, ...props }: DeleteConfirmTextProps) => {
  return (
    <Text fontSize={18} alignSelf={'center'} {...props}>
      정말로 편지를 삭제하시겠습니까?{' '}
      <IconButton
        aria-label="cancel"
        icon={<SmallCloseIcon />}
        size={'xs'}
        variant={'outline'}
        colorScheme={'blackAlpha'}
        mb={1}
        onClick={onCancelClick}
      />
    </Text>
  );
};

export default DeleteConfirmText;
