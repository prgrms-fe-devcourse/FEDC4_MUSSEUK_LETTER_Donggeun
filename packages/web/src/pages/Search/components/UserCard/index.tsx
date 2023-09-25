import { Card, Text, Avatar, CardBody, CardFooter, VStack, HStack, useMediaQuery } from '@chakra-ui/react';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import { EmailIcon } from '@chakra-ui/icons';
import { FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  id: string;
  name: string;
  email: string;
  post: number;
  comment: number;
  image?: string;
};

const UserCard = ({ id, name, email, post, comment, image }: CardProps) => {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Card
      direction={'row'}
      alignItems={'center'}
      width={'100%'}
      p={6}
      border={'2px'}
      borderColor={'green01'}
      borderRadius={'10px'}
      cursor={'pointer'}
      onClick={() => navigate(`/profile/${id}`)}>
      <Avatar bg={'green01'} size={'lg'} src={image ?? defaultProfile} />
      <CardBody>
        <Text fontWeight={'bold'} fontSize={'xl'} mb={1}>
          {name}
        </Text>
        <Text color="#6D8198">{email}</Text>
      </CardBody>
      <CardFooter>
        <VStack
          gap={4}
          color={'blue03'}
          fontSize={'lg'}
          alignItems={'start'}
          justifyContent={'center'}
          display={isMobile ? 'none' : 'flex'}>
          <HStack>
            <FiFileText style={{ width: '26px', height: '26px', marginRight: '10px' }} />
            <Text>{post}</Text>
          </HStack>
          <HStack>
            <EmailIcon w={'26px'} h={'26px'} mr="10px" />
            <Text>{comment}</Text>
          </HStack>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
