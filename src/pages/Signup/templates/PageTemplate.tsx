import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';

const colors = {
  background: '#F2F8EB'
};

const PageTemplate = ({ children, ...props }: FlexProps & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <Flex w="100%" px="4" py="8" minH="100vh" bg={colors.background} justifyContent="center" alignItems="center">
      <Flex
        {...props}
        as="form"
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
    </Flex>
  );
};

export default PageTemplate;
