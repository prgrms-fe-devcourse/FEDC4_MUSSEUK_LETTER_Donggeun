import { useState, ChangeEvent, MouseEvent, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Flex, Button, Image, Textarea, Box, Text, Input, HStack, UnorderedList, ListItem } from '@chakra-ui/react';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import useNewPostMutation from '@/apis/mutations/useNewPostMutation';
import musseuk_semicolon from '@/assets/images/musseuk_semicolon.png';
import musseuk_laptop from '@/assets/images/musseuk_laptop.png';
import musseuk_hood from '@/assets/images/musseuk_hood.png';
import musseuk_heart from '@/assets/images/musseuk_heart.png';
import musseuk_default from '@/assets/images/musseuk_default.png';
import MusseukItem from './components/MusseukItem';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from '@/pages/NotFound';

const channelId = import.meta.env.VITE_CHANNEL_ID;

type MUSSEUK_KEY = keyof typeof MUSSEUK;

const MUSSEUK = {
  SEMICOLON: {
    src: musseuk_semicolon,
    imageName: 'musseuk_semicolon',
    transform: 'scale(1.4) translateY(0.1rem)',
    smallTransform: 'scale(1.4) translateY(0.1rem)',
    selectedTransform: 'scale(1.5)'
  },
  LAPTOP: {
    src: musseuk_laptop,
    imageName: 'musseuk_laptop',
    transform: 'translateY(-0.4rem)',
    smallTransform: 'scale(1) translateY(-0.15rem)',
    selectedTransform: 'scale(0.8) translateY(-6rem)'
  },
  HOOD: {
    src: musseuk_hood,
    imageName: 'musseuk_hood',
    transform: 'scale(0.9)',
    smallTransform: 'scale(0.9)',
    selectedTransform: 'scale(0.7) translateY(-6rem)'
  },
  HEART: {
    src: musseuk_heart,
    imageName: 'musseuk_heart',
    transform: 'translateY(-0.7rem)',
    smallTransform: 'scale(1) translateY(-0.3rem)',
    selectedTransform: 'scale(1) translateY(-1rem)'
  },
  DEFAULT: {
    src: musseuk_default,
    imageName: 'musseuk_default',
    transform: 'scale(1.1) translateY(0.3rem)',
    smallTransform: 'scale(1.1) translateY(0rem)',
    selectedTransform: 'scale(0.82) translateY(-4rem)'
  }
};

const MUSSEUK_IMAGE = {
  SEMICOLON: musseuk_semicolon,
  LAPTOP: musseuk_laptop,
  HOOD: musseuk_hood,
  HEART: musseuk_heart,
  DEFAULT: musseuk_default
};

const TIP_MESSAGE = [
  '칭찬이 받고 싶은 머쓱이',
  '프로토타입 딥다이브 핃피드백 머쓱이',
  'SNS 프로젝트 피드백 머쓱이',
  '아무말 대잔치 머쓱이',
  '면접 스터디 1주차 피드백 머쓱이'
];

const NewPost = () => {
  const { mutate } = useNewPostMutation();

  const { data: user } = useAuthCheckQuery({ suspense: true });

  const [musseukTitle, setMusseukTitle] = useState('');
  const [musseukImage, setMuseukImage] = useState('');
  const [musseukIntroduce, setMusseukIntroduce] = useState('');
  const [selected, setSelected] = useState<MUSSEUK_KEY>('SEMICOLON');

  const navigate = useNavigate();

  const handleMusseukTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMusseukTitle(event.target.value);
  }, []);

  const handleMusseukIntroduce = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setMusseukIntroduce(event.target.value);
  }, []);

  const handleClickMusseuk = useCallback((e: MouseEvent<HTMLImageElement>) => {
    const alt = e.currentTarget.alt as keyof typeof MUSSEUK_IMAGE;
    setSelected(alt);
  }, []);

  const handleCreateMusseukPost = () => {
    const title = JSON.stringify({
      title: `${musseukTitle || '머쓱이'}`,
      content: `${musseukIntroduce || ''}`,
      musseukImageName: `${MUSSEUK[selected].imageName || 'musseuk_default'}`
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

  if (!user && !storage('local').getItem(AUTH_TOKEN, null)) {
    return <Navigate to={'/signin'} replace={true} />;
  }

  return (
    <Box bgColor="bg01">
      <Box p="2rem" margin="auto" w="100%" maxW="50rem" textAlign="center">
        <Text marginBottom="1rem" textAlign="left" fontSize="1.4rem" color="black">
          머쓱이 이름
        </Text>
        <Input
          maxLength={20}
          value={musseukTitle}
          onChange={handleMusseukTitle}
          fontSize="16px"
          height="3rem"
          bgColor="white"
          borderRadius="0.3rem"
          borderColor="#D4D8CA"
          marginBottom="1rem"
          placeholder="머쓱이 이름을 작성해 주세요!"
          size="md"
        />
        <Text marginBottom={'1.5rem'} textAlign={'end'} color={'gray'} fontSize="16px">
          {musseukTitle.length}/20자
        </Text>
        <HStack>
          <Box bg={'green01'} borderRadius={20} px={3}>
            <Text fontWeight={'bold'} color={'white'}>
              TIP
            </Text>
          </Box>
          <Text>이렇게도 머쓱이를 만들어 볼 수 있어요.</Text>
        </HStack>
        <Box bg="rgba(113, 210, 88, 0.1)" borderRadius={10} p={3} mt={3} mb={16}>
          <UnorderedList spacing={3} fontWeight={'light'}>
            {TIP_MESSAGE.map((message, idx) => (
              <ListItem key={idx} textAlign={'start'}>
                {message}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Text textAlign="left" fontSize="1.4rem" color="black">
          머쓱이 테마
        </Text>
        <Box
          margin="auto"
          h={{
            base: '5rem',
            '2xs': '16rem',
            xs: '20rem',
            sm: '25rem'
          }}
          p={4}>
          <Image
            w="100%"
            maxW="25rem"
            mt={{
              '2xs': '2rem'
            }}
            margin="auto"
            src={MUSSEUK[selected].src || musseuk_semicolon}
            transform={MUSSEUK[selected].selectedTransform}
            alt="musseukImage"
          />
        </Box>
        <Box cursor="pointer" bgColor="white" width="auto" borderRadius="10px" border="1px" borderColor="#D4D8CA">
          <Flex justify="center">
            {Object.entries(MUSSEUK).map(([key, value]) => (
              <MusseukItem
                key={key}
                alt={key}
                src={value.src}
                transform={{
                  base: value.smallTransform,
                  sm: value.transform
                }}
                onClick={handleClickMusseuk}
              />
            ))}
          </Flex>
        </Box>
        <Text marginBottom="1rem" marginTop="2rem" textAlign="left" fontSize="1.4rem" color="black">
          편지를 쓸 사람들에게 보여줄 멘트
        </Text>
        <Textarea
          maxLength={80}
          value={musseukIntroduce}
          onChange={handleMusseukIntroduce}
          height="14rem"
          fontSize="16px"
          bgColor="white"
          borderColor="#D4D8CA"
          size="lg"
          marginBottom="1rem"
          placeholder="머쓱이에 대한 소개를 작성해주세요"
          resize="none"
        />
        <Text marginBottom={'2rem'} textAlign={'end'} color={'gray'} fontSize="16px">
          {musseukIntroduce.length}/80자
        </Text>
        <Flex
          direction={{
            base: 'column',
            sm: 'row'
          }}
          justifyContent="space-between"
          gap="1rem">
          <Button
            width={{
              base: '100%',
              sm: '10rem'
            }}
            bgColor="gray.400"
            color="white"
            onClick={() => navigate('/')}
            colorScheme="gray">
            뒤로가기
          </Button>
          <Button
            onClick={handleCreateMusseukPost}
            width={{
              base: '100%',
              sm: '10rem'
            }}
            colorScheme="primary">
            생성하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const NewPostWrapper = () => {
  return (
    <ErrorBoundary fallback={<NotFound />}>
      <Suspense fallback={<Loading />}>
        <NewPost />
      </Suspense>
    </ErrorBoundary>
  );
};

export default NewPostWrapper;
