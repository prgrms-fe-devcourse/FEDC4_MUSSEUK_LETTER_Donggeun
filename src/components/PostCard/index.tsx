import { Card, CardBody, CardFooter, CardHeader, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { UseMutationResult } from '@tanstack/react-query';

type Props = {
  imgName: string;
  musseukName: string;
  userName?: string;
  musseukContent: string;
  letter: number;
  onClick?: () => void;
};

const PostCard = ({ imgName, letter, musseukContent, musseukName, userName, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      w="15.5rem"
      h="19.5rem"
      p={4}
      border={'2px'}
      borderColor={'green01'}
      boxShadow={' 0px 4px 7px 0px rgba(0, 0, 0, 0.25)'}>
      <CardHeader textAlign="center" p={0}>
        <Image
          display={'inline-block'}
          w="9rem"
          h="8rem"
          alt="musseukAvatar"
          src={`src/assets/images/${imgName}.png`}
        />
      </CardHeader>
      <CardBody p={0}>
        <Stack textAlign="center">
          <Heading fontSize="1.3rem">{musseukName}</Heading>
          <Text color="#6D8198" pb="0.3rem" fontSize="0.6rem">
            {userName}
          </Text>
          <Text fontSize="0.8rem">{musseukContent}</Text>
        </Stack>
      </CardBody>
      <CardFooter fontSize="1.1rem" p={0} justify="flex-end" alignItems="center" color={'blue03'}>
        <EmailIcon mr="10px" />
        <Text>{letter}</Text>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
