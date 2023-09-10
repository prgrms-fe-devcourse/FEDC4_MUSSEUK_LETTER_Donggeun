import { Textarea, Box, Text, Input, Heading } from '@chakra-ui/react';

const NewPost = () => {
  return (
    <>
      <Text textAlign="center" fontSize="1.5rem" color="black">
        머쓱이 이름
      </Text>
      <Input w="50%" placeholder="머쓱이 이름을 작성해 주세요!" size="md" />
      <Text textAlign="center" fontSize="1.5rem" color="black">
        머쓱이 테마
      </Text>
      <Box border="1px" h="35rem" w="50%" p={4}>
        This is the Box
      </Box>
      <Text textAlign="center" fontSize="1.5rem" color="black">
        편지를 쓸 사람들에게 보여줄 멘트
      </Text>
      <Textarea w="50%" placeholder="머쓱이에 대한 소개를 작성해주세요" />
    </>
  );
};

export default NewPost;
