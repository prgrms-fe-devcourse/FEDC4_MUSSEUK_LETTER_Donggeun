import { Flex, Button, Heading, Text } from '@chakra-ui/react';
import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';

type ErrorBoundaryCardProps = {
  children: React.ReactNode;
};

const ErrorBoundaryCard = ({ children }: ErrorBoundaryCardProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <PageTemplateWithHeader>
          <Heading textAlign="center">저런!</Heading>
          <Heading mb="5" color="gray.400" fontSize="lg" textAlign="center">
            Data Loading Error!
          </Heading>
          <Flex direction="column" textAlign="center" fontWeight="light" fontSize="lg">
            <Text>아쉽지만</Text>
            <Text>데이터 로딩 중 에러가 발생했어요..</Text>
          </Flex>
          <Button mt="6" w="100%" colorScheme="primary" onClick={resetErrorBoundary}>
            새로고침 하기
          </Button>
        </PageTemplateWithHeader>
      )}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryCard;
