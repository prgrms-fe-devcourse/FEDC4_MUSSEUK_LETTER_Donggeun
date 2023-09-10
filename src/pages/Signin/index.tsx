import { Link } from 'react-router-dom';
import { Image, Heading, Button, Text, Flex } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import musseuk from '@/assets/images/musseuk_hood.png';
import InputField from '@/pages/Signup/components/InputField';
import { PageTemplate, LinkTemplate } from '@/pages/Signup/templates';

const links = {
  signup: '/signup'
};

const SignIn = () => {
  return (
    <PageTemplate>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading textAlign="center">Sign in</Heading>
      <Flex
        color="gray.500"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap="2"
        fontSize="lg"
        textAlign="center"
        fontWeight="light">
        Welcome to 머쓱레터 <EmailIcon />
      </Flex>
      <InputField
        label="Email"
        inputProps={{
          id: 'email',
          type: 'email',
          placeholder: '이메일을 입력해주세요'
        }}
      />
      <InputField
        label="Password"
        inputProps={{
          id: 'password',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요',
          maxLength: 30
        }}
      />
      <Button
        type="submit"
        mt="6"
        w="100%"
        color="white"
        backgroundColor="green01"
        _hover={{ backgroundColor: 'green03' }}
        _active={{ backgroundColor: 'green.500' }}>
        Sign in
      </Button>
      <LinkTemplate>
        <Text color="gray.400">No account yet?</Text>
        <Link to={links.signup}>
          <Text
            color="green.500"
            _hover={{
              color: 'green.600'
            }}
            _active={{
              color: 'green.700'
            }}
            fontWeight="semibold"
            cursor="pointer"
            userSelect="none">
            Create an account
          </Text>
        </Link>
      </LinkTemplate>
    </PageTemplate>
  );
};

export default SignIn;
