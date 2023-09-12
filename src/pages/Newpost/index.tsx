import Header from '@/components/header';
import { Flex, Button, Image, Textarea, Box, Text, Input } from '@chakra-ui/react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box bgColor="color(display-p3 0.9765 0.9765 0.9569);">
        <Box p="2rem" margin="auto" w="42%" textAlign="center">
          <Text marginBottom="1rem" textAlign="left" fontSize="1.5rem" color="black">
            머쓱이 이름
          </Text>
          <Input
            fontSize="1.2rem"
            height="4rem"
            bgColor="white"
            borderRadius="0.3rem"
            marginBottom="2rem"
            placeholder="머쓱이 이름을 작성해 주세요!"
            size="md"
          />
          <Text marginBottom="1rem" textAlign="left" fontSize="1.5rem" color="black">
            머쓱이 테마
          </Text>
          <Box margin="auto" h="35rem" p={4}>
            <Image src={Musseuk} alt="Dan Abramov" />
          </Box>
          <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.5rem" color="black">
            편지를 쓸 사람들에게 보여줄 멘트
          </Text>
          <Textarea
            minHeight="14rem"
            maxHeight="20rem"
            fontSize="1.2rem"
            bgColor="white"
            size="lg"
            marginBottom="4rem"
            placeholder="머쓱이에 대한 소개를 작성해주세요"
          />
          <Flex justifyContent="space-between">
            <Button
              width="10rem"
              bgColor="gray.400"
              color="white"
              onClick={() => {
                navigate('/');
              }}
              colorScheme="gray">
              뒤로가기
            </Button>
            <Button width="10rem" colorScheme="primary">
              생성하기
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default NewPost;
