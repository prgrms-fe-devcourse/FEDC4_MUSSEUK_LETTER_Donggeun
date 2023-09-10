import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Icon, Heading, Text, Image, useBoolean } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignupMutation from '@/apis/mutations/useSignupMutation';
import musseuk from '@/assets/images/musseuk_hood.png';
import InputField from './components/InputField';
import { PageTemplate, LinkTemplate } from './templates';

const links = {
  main: '/',
  signin: '/signin'
};

const formSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(2, 'Length must be greater than 2 characters')
      .max(4, 'Length must be smaller than 4 characters')
      .refine((value) => /^[가-힣]*$/.test(value), '한글만 입력해주세요'),
    password: z
      .string()
      .min(8, 'Length must be greater than 8 characters')
      .refine((value) => /\d/.test(value), 'Password must contain numbers'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type Inputs = z.infer<typeof formSchema>;

const SignUp = () => {
  const { mutate } = useSignupMutation();
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema)
  });
  const navigate = useNavigate();

  const password = watch('password');
  const isPasswordShort = !password || password.length < 8;
  const isPasswordContainNumber = /\d/.test(password);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      { email: data.email, password: data.password, username: data.username },
      {
        onSuccess: () => navigate(links.main),
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          setError('email', { type: 'server', message: errorMessage });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading textAlign="center">Sign up</Heading>
      <InputField
        label="Email"
        error={errors.email}
        inputProps={{
          id: 'email',
          type: 'email',
          placeholder: '이메일을 입력해주세요'
        }}
        registerProps={register('email')}
      />
      <InputField
        label="Username"
        error={errors.username}
        inputProps={{
          id: 'username',
          type: 'text',
          placeholder: '실명을 입력해주세요',
          maxLength: 4
        }}
        registerProps={register('username')}
      />
      <InputField
        label="Password"
        inputProps={{
          id: 'password',
          type: showPassword ? 'text' : 'password',
          placeholder: '비밀번호를 입력해주세요',
          maxLength: 30
        }}
        registerProps={register('password')}
        icon={<Icon as={showPassword ? ViewOffIcon : ViewIcon} onClick={setShowPassword.toggle} />}
      />
      <Box w="100%" fontSize="sm">
        {isPasswordShort && <Text>· Length must be greater than 8 characters</Text>}
        {!isPasswordContainNumber && <Text color="green03">· Password must contain numbers</Text>}
      </Box>
      <InputField
        label="Confirm Password"
        error={errors.confirmPassword}
        inputProps={{
          id: 'confirm-password',
          type: showConfirmPassword ? 'text' : 'password',
          placeholder: '비밀번호를 재확인해주세요',
          maxLength: 30
        }}
        registerProps={register('confirmPassword')}
        icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
      />
      <Button
        type="submit"
        mt="6"
        w="100%"
        color="white"
        backgroundColor="green01"
        _hover={{ backgroundColor: 'green03' }}
        _active={{ backgroundColor: 'green.500' }}>
        Create account
      </Button>
      <LinkTemplate>
        <Text color="gray.400">Already have an account?</Text>
        <Link to={links.signin}>
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
        </Link>
      </LinkTemplate>
    </PageTemplate>
  );
};

export default SignUp;
