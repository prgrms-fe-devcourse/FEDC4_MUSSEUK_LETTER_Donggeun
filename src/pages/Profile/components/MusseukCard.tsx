import { Card, CardHeader, CardBody, CardFooter, Flex } from '@chakra-ui/react';
import { Image, Stack, Heading, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

type cardInfo = {
  imgUrl: string;
  musseukName: string;
  musseukContent: string;
  letter: string;
};

const MusseukCard = ({ cardInfo }) => {
  const { imgUrl, musseukName, musseukContent, letter }: cardInfo = cardInfo;
  return (
    <Card w={56} h={64} p={4} border={'2px'} borderColor={'green01'} boxShadow={' 0px 4px 7px 0px rgba(0, 0, 0, 0.25)'}>
      <CardHeader textAlign="center" p={0}>
        <Image display={'inline-block'} w={20} h={24} alt="musseukAvatar" src={imgUrl} />
      </CardHeader>
      <CardBody mt={4} p={0}>
        <Stack textAlign="center">
          <Heading fontSize="lg" my={4} mx={0}>
            {musseukName}
          </Heading>
          <Text fontSize="0.8rem">{musseukContent}</Text>
        </Stack>
      </CardBody>
      <CardFooter p={0} justify="flex-end" alignItems="center" color={'blue03'}>
        <EmailIcon mr="10px" />
        <Text>{letter}</Text>
      </CardFooter>
    </Card>
  );
};

export default MusseukCard;
