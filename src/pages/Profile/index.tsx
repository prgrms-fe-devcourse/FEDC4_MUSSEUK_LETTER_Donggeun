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

const AddCard = () => {
  const navigate = useNavigate();
  return (
    <Card w={56} h={64} p={4} textAlign={'center'} align={'center'} border={'2px'} borderColor={'green01'}>
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
  const { userId } = useParams();
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
    <>
      <Grid bg={'bg0101'} h="100vh" gridTemplateColumns={'1fr 3.5fr'}>
        <GridItem>
          <ProfileBar
            image={user?.image}
            username={user?.username}
            email={user?.email}
            introduce={user?.introduce}
            isUser={isUser}
          />
        </GridItem>
        <GridItem>
          <Stack h={64} bg={'linear-gradient(93deg, #CCFFB4 10.51%, #F8FFCF 81.79%)'} ml={6} px={6}>
            <Text fontSize={isSmallerThan768 ? '1.2rem' : '1.6rem'} mt={14} py={0}>
              {user?.username}의 편지를 전달해주는 {isSmallerThan768 ? undefined : <br />} 머쓱이 {postList?.length}{' '}
              마리가 기다리고 있어요!
            </Text>
            {isUser ? (
              <Button leftIcon={<AddIcon />} w={56} mt={4} colorScheme="primary" onClick={goToNewPost}>
                새로운 머쓱이 추가
              </Button>
            ) : null}
          </Stack>
          <Grid gridTemplateColumns={isSmallerThan768 ? '1fr' : 'repeat(3, 1fr)'} gap={5} p={6} justifyItems={'center'}>
            {postList?.map((post) => (
              <GridItem key={post._id}>
                <PostCard
                  imgUrl={post.musseukImageName}
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
        </GridItem>
      </Grid>
    </>
  );
};

export default Profile;
