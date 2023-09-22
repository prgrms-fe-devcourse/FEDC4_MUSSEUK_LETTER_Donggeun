import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useGetPostsInfoQuery from '@/apis/queries/useGetPostsInfoQuery';
import PostCard from '@/components/PostCard';
import Description from './components/Description';
import MusseukButton from './components/MusseukButton';
import MusseukImage from './components/MusseukImage';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from '@/pages/NotFound';

const Main = () => {
  const navigate = useNavigate();

  const { data, status } = useGetPostsInfoQuery();

  return (
    <>
      <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
        <Description />
        <MusseukImage />
        <MusseukButton />
      </Box>
      <Box bgColor="bg01" paddingTop="5rem">
        <Swiper
          style={
            {
              '--swiper-pagination-bullet-size': '10px'
            } as CSSProperties
          }
          breakpoints={{
            '0': {
              slidesPerView: 1,
              initialSlide: 0
            },
            '750': {
              slidesPerView: 2,
              initialSlide: 1
            },
            '1080': {
              slidesPerView: 3,
              initialSlide: 2
            },
            '1450': {
              slidesPerView: 4,
              initialSlide: 3
            },
            '1700': {
              slidesPerView: 5,
              initialSlide: 4
            }
          }}
          loop={true}
          modules={[Virtual, Navigation, Pagination]}
          slidesPerGroup={1}
          spaceBetween={0}
          speed={800}
          pagination={{
            type: 'bullets',
            clickable: true,
            bulletClass: `swiper-pagination-bullet`
          }}
          navigation={true}
          virtual={true}>
          {status === 'success' &&
            data
              .slice(0, 100)
              .sort((a, b) => b.comments.length - a.comments.length)
              .slice(0, 15)
              .map((post, index) => (
                <SwiperSlide key={post._id} virtualIndex={index}>
                  <Box mb="3.5rem">
                    <PostCard
                      onClick={() => navigate(`/post/${post._id}`)}
                      imgName={post.musseukImageName}
                      musseukContent={post.content}
                      musseukName={post.title}
                      userName={post.author.username}
                      letter={post.comments.length}
                    />
                  </Box>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </>
  );
};

const MainWrapper = () => {
  return (
    <ErrorBoundary fallback={<NotFound />}>
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainWrapper;
