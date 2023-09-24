import { Flex, Button, Heading, Text } from '@chakra-ui/react';
import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';

const ErrorFallback = () => {
  return (
    <PageTemplateWithHeader>
      <Heading textAlign="center">저런!</Heading>
      <Heading mb="5" color="gray.400" fontSize="lg" textAlign="center">
        Data Loading Error!
      </Heading>
      <Flex direction="column" textAlign="center" fontWeight="light" fontSize="lg">
        <Text>아쉽지만</Text>
        <Text>데이터 로딩 중 에러가 발생했어요..</Text>
      </Flex>
      <Button mt="6" w="100%" colorScheme="primary" onClick={() => window.location.reload()}>
        새로고침 하기
      </Button>
    </PageTemplateWithHeader>
  );
};

export default ErrorFallback;
