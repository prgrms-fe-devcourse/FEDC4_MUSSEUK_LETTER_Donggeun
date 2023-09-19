import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Icon, Heading, Text, Image, useBoolean } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import useSignupMutation from '@/apis/mutations/useSignupMutation';
import musseuk from '@/assets/images/musseuk_hood.png';
import PageTemplate from '@/components/WhiteCard/PageTemplate';
import { isPasswordTooShort, isPasswordContainNumber } from './helpers/password';
import InputField from './components/InputField';
import { LinkTemplate } from './templates';

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
  const navigate = useNavigate();

  const { data: user } = useAuthCheckQuery();
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
  const password = watch('password');

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

  if (user) return <Navigate to={links.main} />;

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading textAlign="center">Sign up</Heading>
      <InputField
        {...register('email')}
        id="email"
        type="email"
        label="Email"
        error={errors.email}
        placeholder="이메일을 입력해주세요"
      />
      <InputField
        {...register('username')}
        id="username"
        type="text"
        label="Username"
        error={errors.username}
        placeholder="실명을 입력해주세요"
        maxLength={4}
      />
      <InputField
        {...register('password')}
        id="password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="비밀번호를 입력해주세요"
        maxLength={30}
        icon={<Icon as={showPassword ? ViewOffIcon : ViewIcon} onClick={setShowPassword.toggle} />}
      />
      <Box w="100%" fontSize="sm">
        {isPasswordTooShort(password) && <Text fontWeight="light">· Length must be greater than 8 characters</Text>}
        {!isPasswordContainNumber(password) && <Text fontWeight="light">· Password must contain numbers</Text>}
      </Box>
      <InputField
        {...register('confirmPassword')}
        id="confirm-password"
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirm Password"
        placeholder="비밀번호를 재확인해주세요"
        maxLength={30}
        error={errors.confirmPassword}
        icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
      />
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
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
