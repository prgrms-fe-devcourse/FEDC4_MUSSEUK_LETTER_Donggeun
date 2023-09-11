import Header from '@/components/header';
import { Flex, Button, Image, Textarea, Box, Text, Input } from '@chakra-ui/react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <Box h="100vh" bgColor="color(display-p3 0.9765 0.9765 0.9569);">
        <Box p="2rem" margin="auto" w="34%" textAlign="center">
          <Text marginBottom="1rem" textAlign="left" fontSize="1.5rem" color="black">
            머쓱이 이름
          </Text>
          <Input marginBottom="2rem" placeholder="머쓱이 이름을 작성해 주세요!" size="md" />
          <Text marginBottom="1rem" textAlign="left" fontSize="1.5rem" color="black">
            머쓱이 테마
          </Text>
          <Box margin="auto" border="1px" h="35rem" p={4}>
            <Image src={Musseuk} alt="Dan Abramov" />
          </Box>
          <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.5rem" color="black">
            편지를 쓸 사람들에게 보여줄 멘트
          </Text>
          <Textarea size="lg" marginBottom="4rem" placeholder="머쓱이에 대한 소개를 작성해주세요" />
          <Flex justifyContent="space-between">
            <Button
              onClick={() => {
                navigate('/');
              }}
              colorScheme="gray">
              뒤로가기
            </Button>
            <Button colorScheme="primary">생성하기</Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default NewPost;
