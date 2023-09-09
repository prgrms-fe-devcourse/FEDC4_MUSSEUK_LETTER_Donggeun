import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Icon, Flex, Heading, Text, Image, useBoolean } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import musseuk from '@/assets/images/musseuk_hood.png';
import InputField from './components/InputField';

const colors = {
  background: '#F2F8EB',
  submit: '#8CD790'
};

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(2),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

type Inputs = z.infer<typeof schema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  return (
    <Flex w="100%" px="4" py="8" minH="100vh" bg={colors.background} justifyContent="center" alignItems="center">
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        px={['8', '16', '24']}
        py={['6', '8', '12']}
        w="100%"
        maxW="xl"
        bg="white"
        boxSizing="border-box"
        boxShadow="lg"
        borderRadius="20px"
        flexDir="column"
        gap="2"
        justifyContent="center"
        alignItems="center">
        <Image maxW="32" src={musseuk} alt="머쓱이" />
        <Heading textAlign="center">Sign up</Heading>
        <InputField
          label="Email"
          errorMessage={errors.email?.message}
          inputProps={{
            id: 'email',
            type: 'email',
            placeholder: '이메일을 입력해주세요'
          }}
          registerProps={register('email', { required: true })}
        />
        <InputField
          label="Username"
          errorMessage={errors.username?.message}
          inputProps={{
            id: 'username',
            type: 'text',
            placeholder: '실명을 입력해주세요'
          }}
          registerProps={register('username', { required: true })}
        />
        <InputField
          label="Password"
          inputProps={{
            id: 'password',
            type: showPassword ? 'text' : 'password',
            placeholder: '비밀번호를 입력해주세요'
          }}
          registerProps={register('password', { required: true })}
          icon={<Icon as={showPassword ? ViewOffIcon : ViewIcon} onClick={setShowPassword.toggle} />}
        />
        <Box w="100%" fontSize="sm">
          <Text>· Length must be greater than 8 characters</Text>
          <Text color="var(--green03)">· Password must contain numbers</Text>
        </Box>
        <InputField
          label="Confirm Password"
          errorMessage={errors.confirmPassword?.message}
          inputProps={{
            id: 'confirm-password',
            type: showConfirmPassword ? 'text' : 'password',
            placeholder: '비밀번호를 재확인해주세요'
          }}
          registerProps={register('confirmPassword', { required: true })}
          icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
        />
        <Button
          type="submit"
          mt="6"
          w="100%"
          color="white"
          backgroundColor="var(--green01)"
          _hover={{ backgroundColor: 'var(--green03)' }}
          _active={{ backgroundColor: 'green.500' }}>
          Create account
        </Button>
        <Flex
          mt="3"
          w="100%"
          direction={['column', 'row']}
          justifyContent="space-around"
          alignItems="center"
          transition="color 0.2s"
          gap="1"
          fontSize="sm">
          <Text color="gray.400">Already have an account?</Text>
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
            Sign in
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
