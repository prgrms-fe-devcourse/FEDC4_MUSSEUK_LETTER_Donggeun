import { Flex, Button, Image, Textarea, Box, Text, Input } from '@chakra-ui/react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';

const NewPost = () => {
  return (
    <>
      <Box p="2rem" margin="auto" w="34%" textAlign="center">
        <Text marginBottom="1rem" textAlign="center" fontSize="1.5rem" color="black">
          머쓱이 이름
        </Text>
        <Input marginBottom="2rem" placeholder="머쓱이 이름을 작성해 주세요!" size="md" />
        <Text marginBottom="1rem" textAlign="center" fontSize="1.5rem" color="black">
          머쓱이 테마
        </Text>
        <Box margin="auto" border="1px" h="35rem" p={4}>
          <Image src={Musseuk} alt="Dan Abramov" />
        </Box>
        <Text marginBottom="1rem" marginTop="2rem" textAlign="center" fontSize="1.5rem" color="black">
          편지를 쓸 사람들에게 보여줄 멘트
        </Text>
        <Textarea marginBottom="4rem" placeholder="머쓱이에 대한 소개를 작성해주세요" />
        <Flex justifyContent="space-between">
          <Button colorScheme="gray">뒤로가기</Button>
          <Button colorScheme="whatsapp">생성하기</Button>
        </Flex>
      </Box>
    </>
  );
};

export default NewPost;
