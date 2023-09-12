import Header from '@/components/header';
import PostCard from '@/components/PostCard';
import MusseukCard from './components/MusseukCard';
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
import defaultMusseuk from '@/assets/images/musseuk_default.png';
import hearttMusseuk from '@/assets/images/musseuk_heart.png';
import hoodMusseuk from '@/assets/images/musseuk_hood.png';
import labtopMusseuk from '@/assets/images/musseuk_labtop.png';
import semicolonMusseuk from '@/assets/images/musseuk_semicolon.png';
import ProfileBar from './components/ProfileBar';

const AddCard = () => {
  return (
    <Card w={56} h={64} p={4} textAlign={'center'} align={'center'} border={'2px'} borderColor={'green01'}>
      <CardHeader>
        <Circle as="button" size="5rem" bg={'green01'} justifyContent="center" m={0} display={'inline-flex'}>
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
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const userName = '곰돌이';
  const musseuk_default = [
    {
      id: 1,
      imgUrl: defaultMusseuk,
      musseukName: 'musseuk1',
      musseukContent: "hello I'm Musseuk1",
      letter: 10
    },
    {
      id: 2,
      imgUrl: hearttMusseuk,
      musseukName: 'musseuk2',
      musseukContent: "hello I'm Musseuk2",
      letter: 11
    },
    {
      id: 3,
      imgUrl: hoodMusseuk,
      musseukName: 'musseuk3',
      musseukContent: "hello I'm Musseuk3",
      letter: 15
    },
    {
      id: 4,
      imgUrl: labtopMusseuk,
      musseukName: 'musseuk4',
      musseukContent: "hello I'm Musseuk4",
      letter: 18
    },
    {
      id: 5,
      imgUrl: semicolonMusseuk,
      musseukName: 'musseuk5',
      musseukContent: "hello I'm Musseuk5",
      letter: 18
    }
  ];
  return (
    <>
      <Grid bg={'bg0101'} h="100vh" gridTemplateColumns={'1fr 3.5fr'}>
        <GridItem>
          <ProfileBar userName={'이상훈'} />
        </GridItem>
        <GridItem>
          <Stack h={64} bg={'linear-gradient(93deg, #CCFFB4 10.51%, #F8FFCF 81.79%)'} ml={6} px={6}>
            <Text fontSize={isSmallerThan768 ? '1.2rem' : '1.6rem'} mt={14} py={0}>
              {userName}의 편지를 전달해주는 {isSmallerThan768 ? undefined : <br />} 머쓱이 5마리가 기다리고 있어요!
            </Text>
            <Button leftIcon={<AddIcon />} w={56} mt={4} colorScheme="primary">
              새로운 머쓱이 추가
            </Button>
          </Stack>
          <Grid gridTemplateColumns={isSmallerThan768 ? '1fr' : 'repeat(3, 1fr)'} gap={5} p={6} justifyItems={'center'}>
            {musseuk_default.map((card) => (
              <GridItem key={card.id}>
                <PostCard {...card} />
              </GridItem>
            ))}
            <AddCard></AddCard>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Profile;
