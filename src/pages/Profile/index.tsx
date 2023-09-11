import Header from '@/components/Header';
import MusseukCard from './components/MusseukCard';
import { Grid, GridItem, Card, CardHeader, CardBody, Circle, Heading, Stack, Text, Button } from '@chakra-ui/react';
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
        <Circle cursor={'pointer'} size="5rem" bg={'green01'} justifyContent="center" m={0} display={'inline-flex'}>
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
      <Header></Header>
      <Grid bg={'bg0101'} h="100vh" templateAreas={`"nav main"`} gridTemplateColumns={'1fr 3.5fr'}>
        <GridItem area={'nav'} px={6}>
          <ProfileBar userName={'이상훈'} />
        </GridItem>
        <GridItem area={'main'} p={[6, 0]}>
          <Stack w={'100%'} h={64} bg={'linear-gradient(93deg, #CCFFB4 10.51%, #F8FFCF 81.79%)'} px={6}>
            <Text fontSize={'1.8rem'} mt={16} py={0} w={'32rem'}>
              {userName}의 편지를 전달해주는 머쓱이 5마리가 기다리고 있어요!
            </Text>
            <Button leftIcon={<AddIcon />} w={56} bg={'green01'} color={'white'} mt={4}>
              새로운 머쓱이 추가
            </Button>
          </Stack>
          <Grid gridTemplateColumns="repeat(3, 1fr)" gap={5} p={6}>
            {musseuk_default.map((card) => (
              <MusseukCard cardInfo={card} key={card.id} />
            ))}
            <AddCard></AddCard>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Profile;
