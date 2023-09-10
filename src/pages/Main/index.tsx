import { useRef, useState } from 'react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import {
  ButtonGroup,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Card,
  CardBody,
  Center,
  Square,
  Box,
  Flex,
  Spacer,
  Image,
  Text,
  Button,
  WrapItem
} from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Main = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(25);
  const prependNumber = useRef(1);
  const [slides, setSlides] = useState(Array.from({ length: 25 }).map((_, index) => `Slide ${index + 1}`));

  return (
    <>
      <Box p="3rem" maxW="32rem">
        <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
        <br></br>
        <Text fontSize="xl">
          팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요? 다른 사람의 머쓱이에게 편지를 남겨보세요!
        </Text>
        <br></br>
        <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
        <Button size="lg" colorScheme="green" mt="24px">
          나만의 머쓱이 만들기
        </Button>
      </Box>

      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction'
        }}
        navigation={true}
        virtual>
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            <Card maxW="sm">
              <CardBody>
                <Image src={Musseuk} alt="Green double couch with wooden legs" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading fontWeight="extrabold" textAlign="center" size="md">
                    머쓱이 2
                  </Heading>
                  <Text fontWeight="bold" fontSize="0.8rem" color="gray" textAlign="center">
                    남궁호수
                  </Text>
                  <Text textAlign="center">안녕하세요! 피드백을 받고 싶으 머쓱이 입니다!</Text>
                  <Box>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 2H4C2.897 2 2 2.897 2 4V16C2 17.103 2.897 18 4 18H7V21.767L13.277 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM20 16H12.723L9 18.233V16H4V4H20V16Z"
                        fill="black"
                      />
                      <path d="M7 7H17V9H7V7ZM7 11H14V13H7V11Z" fill="black" />
                    </svg>
                  </Box>
                  <Text textAlign="right" color="blue.600" fontSize="2xl">
                    24
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Main;
