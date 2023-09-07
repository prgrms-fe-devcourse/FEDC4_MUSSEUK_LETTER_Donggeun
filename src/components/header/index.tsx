import { Box, Button, Flex, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Box>
        <Flex alignItems={'center'}>
          <Box>Logo</Box>
          <Stack spacing={4}>
            <InputGroup>
              <InputRightElement></InputRightElement>
            </InputGroup>
          </Stack>
          <Input size="md" variant="outline" placeholder="사용자 이름을 입력해주세요" />
          <Stack direction={'row'} spacing={3}>
            <Button>알림</Button>
            <Button>프로필</Button>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
