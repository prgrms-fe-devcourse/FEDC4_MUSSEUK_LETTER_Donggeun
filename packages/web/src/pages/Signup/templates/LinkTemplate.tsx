import { Flex } from '@chakra-ui/react';

const LinkTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      mt="3"
      w="100%"
      direction={{
        base: 'column',
        sm: 'row'
      }}
      justifyContent="space-around"
      alignItems="center"
      transition="color 0.2s"
      gap="2"
      fontSize="sm"
      textAlign="center">
      {children}
    </Flex>
  );
};

export default LinkTemplate;
