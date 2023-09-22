import { DeleteIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton } from '@chakra-ui/react';

const DeleteButton = ({ ...props }: ButtonProps) => {
  return (
    <IconButton
      aria-label="삭제"
      colorScheme="primary"
      variant={'outline'}
      size="lg"
      icon={<DeleteIcon />}
      {...props}
    />
  );
};

export default DeleteButton;
