import { Button, ButtonProps } from '@chakra-ui/react';

const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button colorScheme="primary" {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
