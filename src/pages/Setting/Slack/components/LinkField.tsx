import { HStack, Link, LinkProps } from '@chakra-ui/react';

const LinkField = ({ children, ...props }: LinkProps) => {
  return (
    <HStack
      w={'100%'}
      justifyContent={'end'}
      alignItems={'center'}
      _hover={{
        color: 'green.600',
        textDecoration: 'none'
      }}
      _active={{
        color: 'green.700'
      }}>
      <Link {...props} color="green.500" isExternal>
        {children}
      </Link>
    </HStack>
  );
};

export default LinkField;
