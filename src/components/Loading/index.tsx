import { Box, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      position="fixed"
      top="0"
      left="0"
      bg="rgba(0, 0, 0, 0.5)" // 배경 색상 및 투명도 설정
      zIndex="9999">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500" // 로딩 스피너 색상 설정
        size="xl" // 스피너 크기 설정
      />
    </Box>
  );
};

export default Loading;
