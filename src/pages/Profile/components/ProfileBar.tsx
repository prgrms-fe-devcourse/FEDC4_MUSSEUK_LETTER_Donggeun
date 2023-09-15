import { VStack, HStack, Avatar, Button, Text, FormControl, FormLabel, Input } from '@chakra-ui/react';
import hoodMusseuk from '@/assets/images/musseuk_hood.png';
import { BiEnvelope } from 'react-icons/bi';
import { MdComment } from 'react-icons/md';

type UserInfoFieldProps = {
  icon: React.ReactNode;
  type: string;
  value: string;
};

type ProfileBarProps = {
  userName: string;
};

const UserInfoField = ({ icon, type, value }: UserInfoFieldProps) => {
  return (
    <FormControl>
      <HStack my={4} justify={'center'} align={'center'}>
        <FormLabel my={0} fontSize={'1.2rem'}>
          {icon}
        </FormLabel>
        <Input type={type} w={'80%'} h={6} value={value} border={'none'} />
      </HStack>
    </FormControl>
  );
};

const ProfileBar = ({ userName }: ProfileBarProps) => {
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
        <UserInfoField icon={<BiEnvelope />} type={'email'} value={'prong@gmail.com'} />
        <UserInfoField icon={<MdComment />} type={'text'} value={'Introduce~'} />
        <Button colorScheme="primary">프로필 편집하기</Button>
      </VStack>
    </VStack>
  );
};

export default ProfileBar;
