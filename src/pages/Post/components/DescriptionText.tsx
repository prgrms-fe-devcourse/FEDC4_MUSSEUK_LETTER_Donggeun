import { Text, TextProps } from '@chakra-ui/react';

const DescriptionText = ({ children, ...props }: TextProps) => {
  return (
    <Text maxW="40rem" fontSize="lg" wordBreak="keep-all">
      {children}
    </Text>
  );
};

export default DescriptionText;
