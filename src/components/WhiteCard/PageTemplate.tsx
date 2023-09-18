import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';
import WhiteCard from '@/components/WhiteCard/WhiteCard';

const PageTemplate = ({ children, ...props }: FlexProps & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <Flex w="100%" px="4" py="8" minH="100vh" justifyContent="center" alignItems="center" {...props}>
      <WhiteCard as="form">{children}</WhiteCard>
    </Flex>
  );
};

export default PageTemplate;
