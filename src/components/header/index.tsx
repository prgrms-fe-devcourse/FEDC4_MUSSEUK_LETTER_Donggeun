import { Box, Button, Flex, Image, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Icon } from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/images/logo.png';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import InputField from '@/components/header/components/Input';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './components/Button';
import useSignOutMutation from '@/apis/mutations/useSignOutMutation';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import { SubmitHandler, useForm } from 'react-hook-form';
import slackIcon from '@/assets/images/icon-slack.png';

export const HEADER_HEIGHT = 16;

type InputValue = {
  keyword: string;
};

const Header = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm<InputValue>();
  const { mutate } = useSignOutMutation();
  const { data } = useAuthCheckQuery();

  const signOut = () => {
    mutate(undefined, {
      onSuccess: () => navigate('/signin')
    });
  };

  const onSubmit: SubmitHandler<InputValue> = (value: { keyword: string }) => {
    navigate(`/search/${value.keyword}`);
    reset();
  };

  const headerMenu = () => (
    <Stack direction={'row'} spacing={6}>
      <Menu autoSelect={false}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <BellIcon color={'black'} w={8} h={8} cursor={'pointer'} />
        </MenuButton>
        <MenuList minW={36} p={0}>
          <MenuItem
            borderRadius={5}
            h={9}
            justifyContent={'center'}
            _hover={{ bg: 'gray01' }}
            onClick={() => navigate('/setting/slack')}>
            <Image w={4} h={4} alt="slack" src={slackIcon} mr={'0.5rem'} />
            <span>Slack 알림 연동</span>
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu autoSelect={false}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Avatar size={'sm'} src={data?.image ?? defaultProfile} />
        </MenuButton>
        <MenuList minW={36} p={0}>
          <MenuItem
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            h={9}
            justifyContent={'center'}
            _hover={{ bg: 'gray01' }}
            onClick={() => navigate(`/profile/${data?._id}`)}>
            프로필
          </MenuItem>
          <MenuItem
            h={9}
            justifyContent={'center'}
            _hover={{ bg: 'gray01' }}
            onClick={() => navigate('/changePassword')}>
            비밀번호 변경
          </MenuItem>
          <MenuItem
            borderBottomLeftRadius={5}
            borderBottomRightRadius={5}
            h={9}
            justifyContent={'center'}
            _hover={{ bg: 'gray01' }}
            onClick={signOut}>
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );

  return (
    <Box h={HEADER_HEIGHT} px={6} bg={'white'}>
      <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
        <Image h={8} cursor="pointer" src={logo} alt="logo" onClick={() => navigate('/')} />
        <form style={{ width: '65rem' }} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register('keyword')}
            icon={<Icon as={SearchIcon} onClick={handleSubmit(onSubmit)} />}
            id="keyword"
            placeholder="사용자 이름을 입력해 주세요"
            size="md"
            fontSize="14px"
            fontWeight="normal"
          />
        </form>
        {data?._id ? headerMenu() : <PrimaryButton onClick={() => navigate('/signin')}>로그인</PrimaryButton>}
      </Flex>
    </Box>
  );
};

export default Header;
