import { VStack, HStack, Avatar, Button, FormControl, FormLabel, Input, Image, Textarea } from '@chakra-ui/react';
import { BiEnvelope } from 'react-icons/bi';
import { MdComment } from 'react-icons/md';

interface ProfileProps {
  image: string | undefined;
  username: string | undefined;
  email: string | undefined;
  introduce: string | undefined;
}

const ProfileBar = ({ image, username, email, introduce }: ProfileProps) => {
  return (
    <VStack h={'100%'} my={10} pt={4} px={6} borderRight="1px solid #B6B6B6">
      {/* 이미지업로드 */}
      <VStack py={4}>
        <Avatar size={'2xl'} src={image} rounded={'full'} />
        <Button h={8} colorScheme="primary">
          이미지업로드
        </Button>
      </VStack>
      {/* 사용자 정보 변경 */}
      <VStack>
        <Input type="text" placeholder={username} defaultValue={username} border={'none'} textAlign={'center'} />
        <FormControl>
          <HStack my={4} justify={'center'} align={'center'}>
            <FormLabel my={0} fontSize={'1.2rem'}>
              <BiEnvelope />
            </FormLabel>
            <Input type="email" value={email} h={6} border={'none'} isReadOnly={true} />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack my={4} justify={'center'} align={'center'}>
            <FormLabel my={0} fontSize={'1.2rem'}>
              <MdComment />
            </FormLabel>
            <Textarea placeholder="자기소개를 작성해주세요" h={6} defaultValue={introduce} />
          </HStack>
        </FormControl>
        <Button colorScheme="primary">프로필편집하기</Button>
      </VStack>
    </VStack>
  );
};

export default ProfileBar;
