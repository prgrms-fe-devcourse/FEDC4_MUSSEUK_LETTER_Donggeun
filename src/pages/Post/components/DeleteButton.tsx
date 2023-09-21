import { DeleteIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton } from '@chakra-ui/react';

const DeleteButton = ({ ...props }: ButtonProps) => {
  return (
    <IconButton
      aria-label="머쓱이 삭제"
      colorScheme="primary"
      variant={'outline'}
      size="lg"
      icon={<DeleteIcon />}
      position={'absolute'}
      top={0}
      right={0}
      {...props}
    />
  );
};

export default DeleteButton;
