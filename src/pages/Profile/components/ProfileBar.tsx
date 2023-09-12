import { VStack, HStack, Avatar, Button, Text, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { EmailIcon, ChatIcon } from '@chakra-ui/icons';
import hoodMusseuk from '@/assets/images/musseuk_hood.png';

const UserInfoField = ({ icon, type, value }) => {
  return (
    <FormControl>
      <HStack my={4} justify={'center'} align={'center'}>
        <FormLabel my={0}>{icon}</FormLabel>
        <Input type={type} w={'80%'} h={6} value={value} border={'none'} />
      </HStack>
    </FormControl>
  );
};

const ProfileBar = ({ userName }) => {
  return (
    <VStack h={'100%'} my={10} pt={4} px={6} borderRight="1px solid #B6B6B6">
      <VStack py={4}>
        <Avatar size={'2xl'} src={hoodMusseuk} />
        <Button h={8} colorScheme="primary">
          이미지 업로드
        </Button>
        <Text>{userName} 님</Text>
      </VStack>
      <VStack>
        <UserInfoField icon={<EmailIcon />} type={'email'} value={'prong@gmail.com'} />
        <UserInfoField icon={<EmailIcon />} type={'text'} value={'Nickname'} />
        <UserInfoField icon={<ChatIcon />} type={'text'} value={'Introduce~'} />
        <Button colorScheme="primary">프로필 편집하기</Button>
      </VStack>
    </VStack>
  );
};

export default ProfileBar;
