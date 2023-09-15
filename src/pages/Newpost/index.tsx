import { Flex, Button, Image, Textarea, Box, Text, Input } from '@chakra-ui/react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import MusseukLabtop from '@/assets/images/musseuk_labtop.png';
import MusseukHood from '@/assets/images/musseuk_hood.png';
import MusseukHeart from '@/assets/images/musseuk_heart.png';
import MusseukDefault from '@/assets/images/musseuk_default.png';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box bgColor="bg01">
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
          <Box margin="auto" h="31rem" p={4}>
            <Image src={Musseuk} alt="Musseuk" />
          </Box>
          <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
            <Flex justify="center" align="center">
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image p="0.5rem 0 1.1rem 0" objectFit="fill" marginTop="0.7rem" src={Musseuk} alt="Musseuk" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image p="1.3rem 1.7rem 1.9rem 1.3rem" src={MusseukLabtop} alt="MusseukLabtop" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image p="1.5rem" src={MusseukHood} alt="MusseukHood" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image padding="0.8rem 0 1.9rem 0" src={MusseukHeart} alt="MusseukHeart" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image p="0.8rem 1.5rem 0.9rem 0.3rem " src={MusseukDefault} alt="MusseukDefault" />
              </Box>
            </Flex>
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
