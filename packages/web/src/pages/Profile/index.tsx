import PostCard from '@/components/PostCard';
import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Circle,
  Heading,
  Stack,
  Text,
  Button,
  useMediaQuery
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ProfileBar from './components/ProfileBar';
import { useNavigate, useParams } from 'react-router-dom';
import useUserPostListQuery from '@/apis/queries/useUserPostListQuery';
import useUserInfoQuery from '@/apis/queries/useUserInfoQuery';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import { Suspense } from 'react';
import NotFound from '../NotFound';
import Loading from '@/components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AddCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      w="15.5rem"
      h="19.5rem"
      p={4}
      textAlign={'center'}
      align={'center'}
      border={'2px'}
      margin="auto"
      borderColor={'green01'}
      boxShadow=" 0px 4px 7px 0px rgba(0, 0, 0, 0.25)">
      <CardHeader>
        <Circle
          as="button"
          size="5rem"
          bg={'green01'}
          justifyContent="center"
          m={0}
          display={'inline-flex'}
          onClick={() => navigate('/newpost')}>
          <AddIcon color={'white'} boxSize={8} />
        </Circle>
      </CardHeader>
      <CardBody>
        <Heading fontSize="lg">추가하기</Heading>
      </CardBody>
    </Card>
  );
};

const Profile = () => {
  const { userId = '' } = useParams();
  const { data: postList } = useUserPostListQuery(userId);
  const { data: user } = useUserInfoQuery(userId);
  const { data: authUser } = useAuthCheckQuery();

  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  const isUser = userId === authUser?._id;

  const goToNewPost = () => {
    navigate('/newpost');
  };

  return (
    <Grid
      h="100vh"
      templateAreas={{ base: `"description" "profile" "postCard"`, md: `"profile description" "profile postCard"` }}
      gridTemplateColumns={{ base: '100%', md: '1fr 3.5fr' }}>
      <GridItem area={'profile'}>
        <ProfileBar userId={userId} />
      </GridItem>
      <GridItem area={'description'}>
        <Stack h={64} bg={'linear-gradient(93deg, #CCFFB4 10.51%, #F8FFCF 81.79%)'} ml={{ md: 6 }} px={6}>
          <Text fontSize={{ base: '1.2rem', md: '1.6rem' }} mt={14} py={0}>
            {user?.username}님의 편지를 전달해주는 <br /> 머쓱이 {user?.postCount} 마리가 기다리고 있어요!
          </Text>
          {isUser && (
            <Button leftIcon={<AddIcon />} w={56} mt={4} colorScheme="primary" onClick={goToNewPost}>
              새로운 머쓱이 추가
            </Button>
          )}
        </Stack>
      </GridItem>
      <GridItem area={'postCard'} my={{ base: 10 }}>
        {isSmallerThan768 ? (
          <Swiper
            loop
            slidesPerView={1}
            grid={{ rows: 1, fill: 'row' }}
            navigation
            pagination={{ clickable: true }}
            modules={[SwiperGrid, Pagination, Navigation]}>
            {postList?.map((post) => (
              <SwiperSlide key={post._id}>
                <PostCard
                  imgName={post.musseukImageName}
                  musseukName={post.title}
                  musseukContent={post.content}
                  letter={post.comments.length}
                  onClick={() => {
                    navigate(`/post/${post._id}`);
                  }}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <AddCard />
            </SwiperSlide>
          </Swiper>
        ) : (
          <Grid gridTemplateColumns={{ md: 'repeat(3, 1fr)' }} gap={5} p={6} justifyItems={'center'}>
            {postList?.map((post) => (
              <GridItem key={post._id}>
                <PostCard
                  imgName={post.musseukImageName}
                  musseukName={post.title}
                  musseukContent={post.content}
                  letter={post.comments.length}
                  onClick={() => {
                    navigate(`/post/${post._id}`);
                  }}
                />
              </GridItem>
            ))}
            {isUser && <AddCard />}
          </Grid>
        )}
      </GridItem>
    </Grid>
  );
};

const ProfileWrapper = () => {
  return (
    <ErrorBoundary fallback={<NotFound />}>
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProfileWrapper;
