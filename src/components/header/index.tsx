import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider
} from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/img/logo.png';

const Header = () => {
  return (
    <>
      <Box h="3rem" px={3}>
        <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
          <Image h="2rem" src={logo} alt="logo" />
          <InputGroup w="30rem">
            <Input
              size="sm"
              borderRadius="10px"
              borderColor=" var(--blue01)"
              variant="outline"
              placeholder="사용자 이름을 입력해주세요"
              _placeholder={{ opacity: 1, color: 'var(--gray03)' }}
            />
            <InputRightElement h="2rem">
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
          <Stack direction={'row'} spacing={3}>
            <BellIcon w={6} h={6} />
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'xs'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>프로필</MenuItem>
                <MenuDivider />
                <MenuItem>비밀번호 변경</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
