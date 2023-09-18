import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';

const WhiteCard = ({ children, ...props }: FlexProps) => {
  return (
    <Flex
      {...props}
      px={['8', '16', '24']}
      py={['6', '8', '12']}
      w="100%"
      maxW="xl"
      minH="3xl"
      bg="white"
      boxSizing="border-box"
      boxShadow="lg"
      borderRadius="20px"
      flexDir="column"
      gap="2"
      justifyContent="center"
      alignItems="center"
      transition="padding 0.25s ease-in-out">
      {children}
    </Flex>
  );
};

export default WhiteCard;
