import { Button, ButtonProps } from '@chakra-ui/react';

const ListButton = ({ ...props }: ButtonProps) => {
  return (
    <Button colorScheme="primary" size="lg" {...props}>
      리스트로 보기
    </Button>
  );
};

export default ListButton;
