import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';
import WhiteCard from '@/components/WhiteCard/WhiteCard';
import { HEADER_HEIGHT } from '../header';

const PageTemplateWithHeader = ({ children, ...props }: FlexProps & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <Flex
      w="100%"
      px="4"
      py="8"
      minH={`calc(100vh - --chakra-sizes-${HEADER_HEIGHT})`}
      justifyContent="center"
      alignItems="center"
      {...props}>
      <WhiteCard as="form">{children}</WhiteCard>
    </Flex>
  );
};

export default PageTemplateWithHeader;
