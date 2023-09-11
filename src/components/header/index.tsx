import { Box, Button, Flex, Image, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Icon } from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/images/logo.png';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import InputField from '@/components/header/components/Input';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './components/Button';
import useSignOutMutation from '@/apis/mutations/useSignOutMutation';

type HeaderProps = {
  profileImg?: string;
  userId?: string;
};

const Header = ({ profileImg, userId }: HeaderProps) => {
  const navigate = useNavigate();
  const { mutate } = useSignOutMutation();

  const signOut = () => {
    mutate(undefined, {
      onSuccess: () => navigate('/signin')
    });
  };

  const headerMenu = () => (
    <Stack direction={'row'} spacing={6}>
      <BellIcon w={8} h={8} cursor={'pointer'} />
      <Menu autoSelect={false}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Avatar size={'sm'} src={profileImg ?? defaultProfile} />
        </MenuButton>
        <MenuList minW={36} p={0}>
          <MenuItem
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            h={9}
            justifyContent={'center'}
            _hover={{ bg: 'gray01' }}
            onClick={() => navigate(`/profile/${userId}`)}>
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
    <Box h={16} px={6}>
      <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
        <Image h={8} cursor="pointer" src={logo} alt="logo" onClick={() => navigate('/')} />
        <InputField
          icon={<Icon as={SearchIcon} />}
          mw={'65rem'}
          inputProps={{
            placeholder: '사용자 이름을 입력해 주세요',
            size: 'md',
            fontSize: '14px',
            fontWeight: 'normal'
          }}
        />
        {userId ? headerMenu() : <PrimaryButton onClick={() => navigate('/signin')}>로그인</PrimaryButton>}
      </Flex>
    </Box>
  );
};

export default Header;
