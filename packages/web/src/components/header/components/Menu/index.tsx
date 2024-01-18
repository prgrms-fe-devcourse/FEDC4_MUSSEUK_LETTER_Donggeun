import { Button, Image, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { BellIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import slackIcon from '@/assets/images/icon-slack.png';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import { authCheckOption } from '@/apis/queries/useAuthCheckQuery';
import useSignOutMutation from '@/apis/mutations/useSignOutMutation';

const HeaderMenu = () => {
  const navigate = useNavigate();
  const { mutate } = useSignOutMutation();
  const { data } = useQuery({ ...authCheckOption });

  const signOut = () => {
    mutate(undefined, {
      onSuccess: () => navigate('/signin')
    });
  };
  return (
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
};

export default HeaderMenu;
