import { Button, ButtonProps } from '@chakra-ui/react';

const ListButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      backgroundColor="var(--green01)"
      color="white"
      size="lg"
      _hover={{ backgroundColor: 'var(--green03)' }}
      {...props}>
      리스트로 보기
    </Button>
  );
};

export default ListButton;
