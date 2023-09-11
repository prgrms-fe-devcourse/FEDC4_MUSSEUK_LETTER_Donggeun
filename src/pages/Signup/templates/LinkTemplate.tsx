import { Flex } from '@chakra-ui/react';

const LinkTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      mt="3"
      w="100%"
      direction={['column', 'row']}
      justifyContent="space-around"
      alignItems="center"
      transition="color 0.2s"
      gap="1"
      fontSize="sm"
      textAlign="center">
      {children}
    </Flex>
  );
};

export default LinkTemplate;
