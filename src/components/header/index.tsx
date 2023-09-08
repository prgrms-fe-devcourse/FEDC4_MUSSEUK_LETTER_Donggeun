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
import { SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/img/logo.png';

const Header = () => {
  return (
    <>
      <Box bg={'gray.100'} px={3}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Image src={logo} alt="logo" />
          </Box>
          <InputGroup>
            <Input
              borderRadius="10px"
              borderColor="#E2E8F0"
              size="sm"
              variant="outline"
              placeholder="사용자 이름을 입력해주세요"
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
          <Stack direction={'row'} spacing={3}>
            <Button>알림</Button>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'sm'}
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
