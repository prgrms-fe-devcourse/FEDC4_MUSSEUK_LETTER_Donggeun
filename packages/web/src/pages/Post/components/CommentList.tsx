import { Box, BoxProps } from '@chakra-ui/react';

const CommentList = ({ children, ...props }: BoxProps) => {
  return (
    <Box w="100%" h="100%" position="absolute" top="0" left="0" {...props}>
      {children}
    </Box>
  );
};

export default CommentList;
