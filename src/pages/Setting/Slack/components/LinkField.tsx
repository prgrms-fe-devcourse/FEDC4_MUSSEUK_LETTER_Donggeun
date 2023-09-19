import { HStack, Link, LinkProps } from '@chakra-ui/react';

const LinkField = ({ children, ...props }: LinkProps) => {
  return (
    <HStack w={'100%'} justifyContent={'end'} alignItems={'center'}>
      <Link
        {...props}
        color="green.500"
        _hover={{
          color: 'green.600',
          textDecorationLine: 'none'
        }}
        _active={{
          color: 'green.700'
        }}
        isExternal>
        {children}
      </Link>
    </HStack>
  );
};

export default LinkField;
