import { Button, ButtonProps } from '@chakra-ui/react';

const ListButton = ({ ...props }: ButtonProps) => {
  return (
    <Button color="#ECF1E6" textColor="black" size="lg" {...props}>
      리스트로 보기
    </Button>
  );
};

export default ListButton;
