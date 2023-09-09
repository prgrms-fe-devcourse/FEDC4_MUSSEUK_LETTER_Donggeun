import { Box, Button, Flex, Image, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Icon } from '@chakra-ui/react';

import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/images/logo.png';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import InputField from '@/components/Header/components/Input';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  profileImg?: string;
  userId: string;
};

const Header = ({ profileImg, userId }: HeaderProps) => {
  const navigate = useNavigate();

  const handleMenuItem = (path: string) => {
    navigate(path);
  };
  return (
    <Box h={12} px={3}>
      <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
        <Image h={8} cursor="pointer" src={logo} alt="logo" onClick={() => handleMenuItem('/')} />
        <InputField
          icon={<Icon as={SearchIcon} />}
          mw={'35rem'}
          inputProps={{
            placeholder: '사용자 이름을 입력해 주세요',
            size: 'sm',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        />
        <Stack direction={'row'} spacing={3}>
          <BellIcon w={6} h={6} cursor={'pointer'} />
          <Menu autoSelect={false}>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar size={'xs'} src={profileImg ?? defaultProfile} />
            </MenuButton>
            <MenuList minW={36} p={0}>
              <MenuItem
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
                h={7}
                justifyContent={'center'}
                _hover={{ bg: 'var(--gray01)' }}
                onClick={() => handleMenuItem(`/profile/${userId}`)}>
                프로필
              </MenuItem>
              <MenuItem
                borderBottomLeftRadius={5}
                borderBottomRightRadius={5}
                h={7}
                justifyContent={'center'}
                _hover={{ bg: 'var(--gray01)' }}
                onClick={() => handleMenuItem(`/changePassword/${userId}`)}>
                비밀번호 변경
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
