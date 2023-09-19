import { ChangeEvent, MouseEvent } from 'react';
import { Flex, Button, Image, Textarea, Box, Text, Input, useMergeRefs } from '@chakra-ui/react';
import musseuk_semicolon from '@/assets/images/musseuk_semicolon.png';
import musseuk_laptop from '@/assets/images/musseuk_laptop.png';
import musseuk_hood from '@/assets/images/musseuk_hood.png';
import musseuk_heart from '@/assets/images/musseuk_heart.png';
import musseuk_default from '@/assets/images/musseuk_default.png';
import table from '@/assets/images/table.png';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import useNewPostMutation from '@/apis/mutations/useNewPostMutation';
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const NewPost = () => {
  const { mutate } = useNewPostMutation();

  const [musseukTitle, setMusseukTitle] = useState('');
  const [musseukImage, setMuseukImage] = useState('');
  const [musseukIntroduce, setMusseukIntroduce] = useState('');

  const musseukImageRef = useRef<HTMLImageElement>(null);

  const handleMusseukTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setMusseukTitle(event.target.value);
    console.log('musseukTitle이 바뀌는 중이에요', musseukTitle);
  };

  const handlemusseukIntroduce = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMusseukIntroduce(event.target.value);
    console.log('musseukIntroduce 바뀌는 중이에요', musseukIntroduce);
  };

  const clickMusseuk = (e: MouseEvent<HTMLDivElement>) => {
    const regex = /(?<=\/)[^/]*(?=\.[^.]+$)/;
    const result = e.target.src.match(regex);
    if (result) {
      setMuseukImage(result[0]);
      console.log('선택한 머쓱이미지는', musseukImage);
      musseukImageRef.current?.setAttribute('src', e.target.src);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Box bgColor="bg01">
        <Box p="2rem" margin="auto" w="42%" textAlign="center">
          <Text marginBottom="1rem" textAlign="left" fontSize="1.5rem" color="black">
            머쓱이 이름
          </Text>
          <Input
            value={musseukTitle}
            onChange={handleMusseukTitle}
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
          <Box margin="auto" h="30rem" p={4}>
            <Image
              w="25rem"
              margin="auto"
              ref={musseukImageRef}
              src={musseukImage || musseuk_semicolon}
              alt="musseukImage"
            />
            {/* <Image margin="auto" src={table} alt="table" /> */}
          </Box>
          <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
            <Flex justify="center" align="center">
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image
                  onClick={clickMusseuk}
                  p="0.5rem 0 1.1rem 0"
                  objectFit="fill"
                  marginTop="0.7rem"
                  src={musseuk_semicolon}
                  alt="musseuk_semicolon"
                />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image
                  onClick={clickMusseuk}
                  p="1.3rem 1.7rem 1.9rem 1.3rem"
                  src={musseuk_laptop}
                  alt="musseuk_laptop"
                />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image onClick={clickMusseuk} p="1.5rem" src={musseuk_hood} alt="musseuk_hood" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image onClick={clickMusseuk} padding="0.8rem 0 1.9rem 0" src={musseuk_heart} alt="musseuk_heart" />
              </Box>
              <Box
                border="0.3rem solid transparent"
                borderRadius="10px"
                _hover={{ borderColor: '#72D988' }}
                width="50rem"
                height="auto">
                <Image
                  onClick={clickMusseuk}
                  p="0.8rem 1.5rem 0.9rem 0.3rem "
                  src={musseuk_default}
                  alt="musseuk_default"
                />
              </Box>
            </Flex>
          </Box>
          <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.5rem" color="black">
            편지를 쓸 사람들에게 보여줄 멘트
          </Text>
          <Textarea
            value={musseukIntroduce}
            onChange={handlemusseukIntroduce}
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
            <Button
              onClick={() => {
                const title = JSON.stringify({
                  musseukTitle: `${musseukTitle || '머쓱이'}`,
                  musseukIntroduce: `${musseukIntroduce || ''}`,
                  musseukImageName: `${musseukImage || 'musseuk_default'}`
                });
                mutate(
                  { title, musseukImage, CHANNEL_ID },
                  {
                    onSuccess: (data) => {
                      navigate(`/post/${data._id}`);
                    }
                  }
                );
              }}
              width="10rem"
              colorScheme="primary">
              생성하기
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default NewPost;
