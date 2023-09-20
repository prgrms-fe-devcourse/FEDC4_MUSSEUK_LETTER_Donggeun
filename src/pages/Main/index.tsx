import Museeukhood from '@/assets/images/musseuk_hood.png';
import rightarrow from '@/assets/images/rightarrow.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { Heading, Box, Image, Text, Button, Center } from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useGetPostsInfoQuery from '@/apis/queries/useGetPostsInfoQuery';
import musseuk_semicolon from '@/assets/images/musseuk_semicolon.png';
import PostCard from '@/components/PostCard';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import { useMediaQuery } from 'react-responsive';

const Main = () => {
  const navigate = useNavigate();

  const { data, status } = useGetPostsInfoQuery();
  console.log(data);
  const { data: user } = useAuthCheckQuery();

  const isPc = useMediaQuery({
    query: '(min-width:1642px)'
  });
  const isTablet = useMediaQuery({
    query: '(min-width : 1061px) and (max-width :1641px)'
  });
  const isMobile = useMediaQuery({
    query: '(max-width:1061px)'
  });
  return (
    <>
      {isPc && (
        <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
          <Image
            top="3.3rem"
            right="1rem"
            position="absolute"
            w="40rem"
            h="30rem"
            src={musseuk_semicolon}
            alt="musseuk_semicolon"
          />
          <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
          <br></br>
          <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
          <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
          <br></br>
          <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
          <Button
            onClick={() => {
              if (!user && !storage('session').getItem(AUTH_TOKEN, null)) {
                navigate('/signin');
              } else {
                navigate('/newpost');
              }
            }}
            display="flex"
            m="auto"
            size="lg"
            colorScheme="primary"
            mt="3.5rem">
            <Image boxSize="2.5rem" src={Museeukhood} alt="Museeukhood" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;나만의 머쓱이
            만들기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image src={rightarrow} alt="rightarrow" />
          </Button>
        </Box>
      )}
      {isTablet && (
        <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
          <Image
            top="3.3rem"
            right="1rem"
            position="absolute"
            w="40rem"
            h="30rem"
            src={musseuk_semicolon}
            alt="musseuk_semicolon"
          />
          <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
          <br></br>
          <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
          <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
          <br></br>
          <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
          <Box height="10rem"></Box>
          <Button
            onClick={() => {
              if (!user && !storage('session').getItem(AUTH_TOKEN, null)) {
                navigate('/signin');
              } else {
                navigate('/newpost');
              }
            }}
            display="flex"
            m="auto"
            size="lg"
            colorScheme="primary"
            mt="3.5rem">
            <Image boxSize="2.5rem" src={Museeukhood} alt="Museeukhood" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;나만의 머쓱이
            만들기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image src={rightarrow} alt="rightarrow" />
          </Button>
        </Box>
      )}
      {isMobile && (
        <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
          <Heading fontSize="4xl" textAlign="center" mb={10}>
            데브코스 익명 편지 전송 서비스
          </Heading>
          <br></br>
          <Text textAlign="center" fontSize="xl">
            팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?
          </Text>
          <Text textAlign="center" fontSize="xl">
            다른 사람의 머쓱이에게 편지를 남겨보세요!
          </Text>
          <br></br>
          <Text textAlign="center" fontSize="xl">
            {' '}
            또는, 당신의 머쓱이를 만들어서 공유해보세요!{' '}
          </Text>
          <Box display="block" height="30%">
            <Image
              margin="auto"
              top="3.3rem"
              right="1rem"
              w="90%"
              h="auto"
              src={musseuk_semicolon}
              alt="musseuk_semicolon"
            />
          </Box>
          <Button
            onClick={() => {
              if (!user && !storage('session').getItem(AUTH_TOKEN, null)) {
                navigate('/signin');
              } else {
                navigate('/newpost');
              }
            }}
            display="flex"
            m="auto"
            size="lg"
            colorScheme="primary"
            mt="3.5rem">
            <Image boxSize="2rem" src={Museeukhood} alt="Museeukhood" />
            &nbsp;&nbsp;&nbsp;&nbsp;나만의 머쓱이 만들기&nbsp;&nbsp;&nbsp;&nbsp;
            <Image boxSize="0.8rem" src={rightarrow} alt="rightarrow" />
          </Button>
        </Box>
      )}
      <Box bgColor="bg01" paddingTop="5rem">
        <Swiper
          breakpoints={{
            '0': {
              slidesPerView: 1
            },
            '750': {
              slidesPerView: 2
            },
            '1080': {
              slidesPerView: 3
            },
            '1450': {
              slidesPerView: 4
            },
            '1700': {
              slidesPerView: 5
            }
          }}
          loop={true}
          modules={[Virtual, Navigation, Pagination]}
          slidesPerGroup={1}
          centeredSlides={false}
          spaceBetween={0}
          speed={800}
          pagination={{
            type: 'bullets'
          }}
          navigation={true}
          virtual={true}>
          {status === 'success' &&
            data
              .slice(0, 100)
              .sort((a, b) => b.comments.length - a.comments.length)
              .slice(0, 15)
              .map((slideContent, index) => (
                <SwiperSlide key={slideContent._id} virtualIndex={index}>
                  <Box ml="4rem" mb="3.5rem" cursor="pointer">
                    <PostCard
                      onClick={() => {
                        if (!user && !storage('session').getItem(AUTH_TOKEN, null)) {
                          navigate('/signin');
                        } else {
                          navigate(`/post/${slideContent._id}`);
                        }
                      }}
                      imgName={JSON.parse(slideContent.title).musseukImageName}
                      musseukName={JSON.parse(slideContent.title).title}
                      userName={JSON.parse(slideContent.author.fullName).username}
                      musseukContent={JSON.parse(slideContent.title).content}
                      letter={slideContent.comments.length}
                    />
                  </Box>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
      <Box bgColor="color(display-p3 0.9765 0.9765 0.9569);">&nbsp;</Box>
    </>
  );
};

export default Main;
