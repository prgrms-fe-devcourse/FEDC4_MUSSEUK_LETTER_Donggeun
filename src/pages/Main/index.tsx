import Museeukhood from '@/assets/images/musseuk_hood.png';
import rightarrow from '@/assets/images/rightarrow.png';
import { useNavigate } from 'react-router-dom';
import { Heading, Box, Image, Text, Button } from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useGetPostsInfoQuery from '@/apis/queries/useGetPostsInfoQuery';
import musseuk_semicolon from '@/assets/images/musseuk_semicolon.png';
import PostCard from '@/components/PostCard';

const Main = () => {
  const navigate = useNavigate();

  const { data, status } = useGetPostsInfoQuery();

  return (
    <>
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
      <Box bgColor="bg01" paddingTop="5rem">
        <Swiper
          loop={true}
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={5}
          slidesPerGroup={5}
          centeredSlides={false}
          spaceBetween={0}
          speed={1000}
          pagination={{
            type: 'bullets'
          }}
          navigation={true}
          virtual>
          {status === 'success' &&
            data.map((slideContent, index) => (
              <SwiperSlide key={slideContent._id} virtualIndex={index}>
                <Box ml="4rem" mb="3.5rem">
                  <PostCard
                    imgName="null"
                    musseukName={slideContent.title}
                    userName={slideContent.author.fullName}
                    musseukContent="content 내용 어떻게 불러오면 좋을지 생각해보자"
                    letter={slideContent.comments.length}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* 포스트 카드 참조 예시 코드 */}
        {/* <PostCard
        imgName={JSON.parse(data[0].title).musseukImageName}
        musseukName={JSON.parse(data[0].title).musseukTitle}
        userName={data[0].author.fullName}
        musseukContent="content 내용 어떻게 불러오면 좋을지 생각해보자"
        letter={data[0].comments.length}
      /> */}
      </Box>
      <Box bgColor="color(display-p3 0.9765 0.9765 0.9569);">&nbsp;</Box>
    </>
  );
};

export default Main;
