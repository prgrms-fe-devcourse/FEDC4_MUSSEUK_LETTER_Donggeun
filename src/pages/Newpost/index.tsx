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
import { useMediaQuery } from 'react-responsive';

const channelId = import.meta.env.VITE_CHANNEL_ID;

const NewPost = () => {
  const { mutate } = useNewPostMutation();

  const [musseukTitle, setMusseukTitle] = useState('');
  const [musseukImage, setMuseukImage] = useState('');
  const [musseukIntroduce, setMusseukIntroduce] = useState('');

  const musseukImageRef = useRef<HTMLImageElement>(null);

  const navigate = useNavigate();

  const handleMusseukTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setMusseukTitle(event.target.value);
    console.log('musseukTitle이 바뀌는 중이에요', musseukTitle);
  };

  const handleMusseukIntroduce = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleCreateMusseukPost = () => {
    const title = JSON.stringify({
      title: `${musseukTitle || '머쓱이'}`,
      content: `${musseukIntroduce || ''}`,
      musseukImageName: `${musseukImage || 'musseuk_default'}`
    });
    mutate(
      { title, musseukImage, channelId },
      {
        onSuccess: (data) => {
          navigate(`/post/${data._id}`);
        }
      }
    );
  };

  const isPc = useMediaQuery({
    query: '(min-width:1400px)'
  });
  const isPC2 = useMediaQuery({
    query: '(min-width : 914px) and (max-width :1400px)'
  });
  const isTablet = useMediaQuery({
    query: '(min-width : 500px) and (max-width:913px)'
  });
  const isMobile = useMediaQuery({
    query: '(max-width:499px)'
  });

  return (
    <>
      {isPc && (
        <Box bgColor="bg01">
          <Box p="2rem" margin="auto" w="42%" textAlign="center">
            <Text marginBottom="1rem" textAlign="left" fontSize="1.4rem" color="black">
              머쓱이 이름
            </Text>
            <Input
              value={musseukTitle}
              onChange={handleMusseukTitle}
              fontSize="1.1rem"
              height="3rem"
              bgColor="white"
              borderRadius="0.3rem"
              marginBottom="1.5rem"
              placeholder="머쓱이 이름을 작성해 주세요!"
              size="md"
            />
            <Text textAlign="left" fontSize="1.4rem" color="black">
              머쓱이 테마
            </Text>
            <Box margin="auto" h="27rem" p={4}>
              <Image
                objectFit="cover"
                w="25rem"
                margin="auto"
                ref={musseukImageRef}
                src={musseukImage || musseuk_semicolon}
                alt="musseukImage"
              />
              {/* <Image margin="auto" src={table} alt="table" /> */}
            </Box>
            <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
              <Flex justify="center">
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(1.4) translateY(0.1rem)"
                    src={musseuk_semicolon}
                    alt="musseuk_semicolon"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.4rem)"
                    src={musseuk_laptop}
                    alt="musseuk_laptop"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(0.9)"
                    onClick={clickMusseuk}
                    src={musseuk_hood}
                    alt="musseuk_hood"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.7rem)"
                    onClick={clickMusseuk}
                    src={musseuk_heart}
                    alt="musseuk_heart"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(0.3rem) scale(1.1)"
                    onClick={clickMusseuk}
                    src={musseuk_default}
                    alt="musseuk_default"
                  />
                </Box>
              </Flex>
            </Box>
            <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.4rem" color="black">
              편지를 쓸 사람들에게 보여줄 멘트
            </Text>
            <Textarea
              value={musseukIntroduce}
              onChange={handleMusseukIntroduce}
              minHeight="14rem"
              maxHeight="20rem"
              fontSize="1.1rem"
              bgColor="white"
              size="lg"
              marginBottom="3rem"
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
              <Button onClick={handleCreateMusseukPost} width="10rem" colorScheme="primary">
                생성하기
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
      {isPC2 && (
        <Box bgColor="bg01">
          <Box p="2rem" margin="auto" w="70%" textAlign="center">
            <Text marginBottom="1rem" textAlign="left" fontSize="1.4rem" color="black">
              머쓱이 이름
            </Text>
            <Input
              value={musseukTitle}
              onChange={handleMusseukTitle}
              fontSize="1.1rem"
              height="3rem"
              bgColor="white"
              borderRadius="0.3rem"
              marginBottom="1.5rem"
              placeholder="머쓱이 이름을 작성해 주세요!"
              size="md"
            />
            <Text textAlign="left" fontSize="1.4rem" color="black">
              머쓱이 테마
            </Text>
            <Box margin="auto" h="27rem" p={4}>
              <Image
                objectFit="cover"
                w="25rem"
                margin="auto"
                ref={musseukImageRef}
                src={musseukImage || musseuk_semicolon}
                alt="musseukImage"
              />
              {/* <Image margin="auto" src={table} alt="table" /> */}
            </Box>
            <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
              <Flex justify="center">
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(1.4) translateY(0.1rem)"
                    src={musseuk_semicolon}
                    alt="musseuk_semicolon"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.4rem)"
                    src={musseuk_laptop}
                    alt="musseuk_laptop"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(0.9)"
                    onClick={clickMusseuk}
                    src={musseuk_hood}
                    alt="musseuk_hood"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.7rem)"
                    onClick={clickMusseuk}
                    src={musseuk_heart}
                    alt="musseuk_heart"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(0.3rem) scale(1.1)"
                    onClick={clickMusseuk}
                    src={musseuk_default}
                    alt="musseuk_default"
                  />
                </Box>
              </Flex>
            </Box>
            <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.4rem" color="black">
              편지를 쓸 사람들에게 보여줄 멘트
            </Text>
            <Textarea
              value={musseukIntroduce}
              onChange={handleMusseukIntroduce}
              minHeight="14rem"
              maxHeight="20rem"
              fontSize="1.1rem"
              bgColor="white"
              size="lg"
              marginBottom="3rem"
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
              <Button onClick={handleCreateMusseukPost} width="10rem" colorScheme="primary">
                생성하기
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
      {isTablet && (
        <Box bgColor="bg01">
          <Box p="2rem" margin="auto" w="100%" textAlign="center">
            <Text marginBottom="1rem" textAlign="left" fontSize="24px" color="black">
              머쓱이 이름
            </Text>
            <Input
              value={musseukTitle}
              onChange={handleMusseukTitle}
              fontSize="18px"
              height="3rem"
              bgColor="white"
              borderRadius="0.3rem"
              marginBottom="1.5rem"
              placeholder="머쓱이 이름을 작성해 주세요!"
              size="md"
            />
            <Text textAlign="left" fontSize="24px" color="black">
              머쓱이 테마
            </Text>
            <Box margin="auto" h="20%" p={4}>
              <Image
                objectFit="cover"
                w="25rem"
                margin="auto"
                ref={musseukImageRef}
                src={musseukImage || musseuk_semicolon}
                alt="musseukImage"
              />
              {/* <Image margin="auto" src={table} alt="table" /> */}
            </Box>
            <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
              <Flex justify="center">
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(1.4) translateY(0.1rem)"
                    src={musseuk_semicolon}
                    alt="musseuk_semicolon"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.1rem)"
                    src={musseuk_laptop}
                    alt="musseuk_laptop"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(0.9)"
                    onClick={clickMusseuk}
                    src={musseuk_hood}
                    alt="musseuk_hood"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.4rem) "
                    onClick={clickMusseuk}
                    src={musseuk_heart}
                    alt="musseuk_heart"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(0.1rem) scale(1.1)"
                    onClick={clickMusseuk}
                    src={musseuk_default}
                    alt="musseuk_default"
                  />
                </Box>
              </Flex>
            </Box>
            <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="24px" color="black">
              편지를 쓸 사람들에게 보여줄 멘트
            </Text>
            <Textarea
              value={musseukIntroduce}
              onChange={handleMusseukIntroduce}
              minHeight="14rem"
              maxHeight="20rem"
              fontSize="18px"
              bgColor="white"
              size="lg"
              marginBottom="3rem"
              placeholder="머쓱이에 대한 소개를 작성해주세요"
            />
            <Flex flexDirection="column" alignItems="center">
              <Button
                fontSize="18px"
                width="100%"
                height="3rem"
                marginBottom="2rem"
                bgColor="gray.400"
                color="white"
                onClick={() => {
                  navigate('/');
                }}
                colorScheme="gray">
                뒤로가기
              </Button>
              <Button
                fontSize="18px"
                onClick={handleCreateMusseukPost}
                width="100%"
                height="3rem"
                colorScheme="primary">
                생성하기
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box bgColor="bg01">
          <Box p="1rem" margin="auto" w="100%" textAlign="center">
            <Text marginBottom="1rem" textAlign="left" fontSize="24px" color="black">
              머쓱이 이름
            </Text>
            <Input
              value={musseukTitle}
              onChange={handleMusseukTitle}
              fontSize="0.9rem"
              height="3rem"
              bgColor="white"
              borderRadius="0.3rem"
              marginBottom="1.5rem"
              placeholder="머쓱이 이름을 작성해 주세요!"
              size="md"
            />
            <Text textAlign="left" fontSize="24px" color="black">
              머쓱이 테마
            </Text>
            <Box margin="auto" h="20%" p={4}>
              <Image
                objectFit="cover"
                w="25rem"
                margin="auto"
                ref={musseukImageRef}
                src={musseukImage || musseuk_semicolon}
                alt="musseukImage"
              />
              {/* <Image margin="auto" src={table} alt="table" /> */}
            </Box>
            <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
              <Flex justify="center">
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scale(1.6) translateY(0.1rem)"
                    src={musseuk_semicolon}
                    alt="musseuk_semicolon"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    onClick={clickMusseuk}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.1rem) scale(1.1)"
                    src={musseuk_laptop}
                    alt="musseuk_laptop"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    onClick={clickMusseuk}
                    src={musseuk_hood}
                    alt="musseuk_hood"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(-0.3rem) scale(1.1)"
                    onClick={clickMusseuk}
                    src={musseuk_heart}
                    alt="musseuk_heart"
                  />
                </Box>
                <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="translateY(0.1rem) scale(1.2)"
                    onClick={clickMusseuk}
                    src={musseuk_default}
                    alt="musseuk_default"
                  />
                </Box>
              </Flex>
            </Box>
            <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="24px" color="black">
              편지를 쓸 사람들에게 보여줄 멘트
            </Text>
            <Textarea
              value={musseukIntroduce}
              onChange={handleMusseukIntroduce}
              minHeight="14rem"
              maxHeight="20rem"
              fontSize="0.9rem"
              bgColor="white"
              size="lg"
              marginBottom="1.5rem"
              placeholder="머쓱이에 대한 소개를 작성해주세요"
            />
            <Flex flexDirection="column" alignItems="center">
              <Button
                fontSize="18px"
                width="100%"
                marginBottom="1rem"
                bgColor="gray.400"
                color="white"
                onClick={() => {
                  navigate('/');
                }}
                colorScheme="gray">
                뒤로가기
              </Button>
              <Button fontSize="18px" onClick={handleCreateMusseukPost} width="100%" colorScheme="primary">
                생성하기
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewPost;
