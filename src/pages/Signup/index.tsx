import {
  Box,
  Button,
  Icon,
  VStack,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  useBoolean
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import type { InputProps } from '@chakra-ui/react';

const colors = {
  background: '#F2F8EB',
  error: '#DD1D1D'
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

  return (
    <Flex w="100%" p="8" minH="100vh" bg={colors.background} justifyContent="center" alignItems="center">
      <Flex
        p="8"
        w="100%"
        maxW="500px"
        maxH="1000px"
        bg="white"
        boxSizing="border-box"
        boxShadow="lg"
        borderRadius="20px"
        flexDir="column"
        gap="2"
        justifyContent="center"
        alignItems="center">
        <Heading>Sign up</Heading>
        <InputField
          label="Email"
          errorMessage="Error Message"
          inputProps={{
            id: 'email',
            type: 'email',
            placeholder: '이메일을 입력해주세요'
          }}
        />
        <InputField
          label="Username"
          inputProps={{
            id: 'username',
            type: 'text',
            placeholder: '실명을 입력해주세요'
          }}
        />
        <InputField
          label="Password"
          inputProps={{
            id: 'password',
            type: showPassword ? 'text' : 'password',
            placeholder: '비밀번호를 입력해주세요'
          }}
          icon={<Icon as={showPassword ? ViewOffIcon : ViewIcon} onClick={setShowPassword.toggle} />}
        />
        <Box w="100%" fontSize="sm">
          <Text>· Length must be greater than 8 characters</Text>
          <Text color="green.400">· Password must contain numbers</Text>
        </Box>
        <InputField
          label="Confirm Password"
          errorMessage="Error Message"
          inputProps={{
            id: 'confirm-password',
            type: showConfirmPassword ? 'text' : 'password',
            placeholder: '비밀번호를 재확인해주세요'
          }}
          icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
        />
        <Button mt="6" w="100%" colorScheme="green">
          Create account
        </Button>
        <Flex mt="3" w="100%" justifyContent="space-around" userSelect="none">
          <Text color="gray.400" fontSize="sm" cursor="pointer">
            Already have an account?
          </Text>
          <Text color="green.500" fontSize="sm" fontWeight="semibold" cursor="pointer">
            Sign in
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const InputField = ({
  label,
  errorMessage,
  inputProps,
  icon
}: {
  label: string;
  errorMessage?: string;
  inputProps: InputProps;
  icon?: React.ReactNode;
}) => {
  return (
    <VStack w="100%" align="start">
      <Text as="label" fontWeight="semibold" htmlFor={inputProps.id}>
        {label}
      </Text>
      <InputGroup>
        <Input w="100%" {...inputProps} />
        <InputRightElement cursor="pointer">{icon}</InputRightElement>
      </InputGroup>
      {errorMessage && (
        <Text fontSize="sm" color={colors.error}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default SignUp;
