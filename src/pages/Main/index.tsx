import Header from '@/components/header';
import { useRef, useState } from 'react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import Museeukhood from '@/assets/images/musseuk_hood.png';
import rightarrow from '@/assets/images/rightarrow.png';
import { useNavigate } from 'react-router-dom';
import { Heading, Box, Image, Text, Button } from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PostCard from '@/components/PostCard';

const Main = () => {
  const navigate = useNavigate();

  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(25);
  const prependNumber = useRef(1);
  const [slides, setSlides] = useState(Array.from({ length: 25 }).map((_, index) => `Slide ${index + 1}`));

  return (
    <>
      <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
        <Image top="3.3rem" right="1rem" position="absolute" w="40rem" h="30rem" src={Musseuk} alt="Musseuk" />
        <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
        <br></br>
        <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
        <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
        <br></br>
        <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
        <Button
          onClick={() => {
            navigate('/newpost');
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

      <Box h="100vh" bgColor="color(display-p3 0.9765 0.9765 0.9569);" paddingTop="5rem">
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={0}
          pagination={{
            type: 'fraction'
          }}
          navigation={true}
          virtual>
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              <PostCard
                imgUrl={Musseuk}
                musseukName="머쓱이 1"
                userName="남궁호수"
                musseukContent="안녕하세요! 피드백을 받고 싶은 머쓱이 입니다!"
                letter={24}></PostCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Main;
