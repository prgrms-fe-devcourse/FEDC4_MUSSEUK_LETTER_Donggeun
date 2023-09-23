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
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="9999">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green03" size="xl" />
    </Box>
  );
};

export default Loading;
