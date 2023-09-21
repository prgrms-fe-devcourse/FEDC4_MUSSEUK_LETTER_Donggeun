import { Link, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Icon, Heading, Text, Image, useBoolean } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignupMutation from '@/apis/mutations/useSignupMutation';
import useIsNotLoggedIn from '@/hooks/useIsNotLoggedIn';
import musseuk from '@/assets/images/musseuk_hood.png';
import PageTemplate from '@/components/WhiteCard/PageTemplate';
import { isPasswordTooShort, isPasswordContainNumber } from './helpers/password';
import InputField from './components/InputField';
import { LinkTemplate } from './templates';

const ERROR_MESSAGE: {
  [key: string]: string;
} = {
  'The email address is already being used.': '이미 사용중인 이메일 주소입니다.'
};

const links = {
  main: '/',
  signin: '/signin'
};

const formSchema = z
  .object({
    email: z.string().email('이메일 주소 형태로만 입력할 수 있습니다.'),
    username: z
      .string()
      .min(2, '2글자에서 4글자로만 입력할 수 있습니다.')
      .max(4, '2글자에서 4글자로만 입력할 수 있습니다.')
      .refine((value) => /^[가-힣]*$/.test(value), '한글만 입력할 수 있습니다.'),
    password: z
      .string()
      .min(8, '8글자 이상으로만 입력할 수 있습니다.')
      .refine((value) => /\d/.test(value), '숫자를 반드시 포함해야 합니다.'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });

type Inputs = z.infer<typeof formSchema>;

const SignUp = () => {
  const { isNotLoggedIn } = useIsNotLoggedIn();
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
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          setError('email', { type: 'server', message: ERROR_MESSAGE[errorMessage] || errorMessage });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  if (!isNotLoggedIn) return <Navigate to={links.main} />;

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading textAlign="center">회원가입</Heading>
      <InputField
        {...register('email')}
        id="email"
        type="email"
        label="이메일"
        error={errors.email}
        placeholder="이메일을 입력해주세요"
      />
      <InputField
        {...register('username')}
        id="username"
        type="text"
        label="이름"
        error={errors.username}
        placeholder="이름을 입력해주세요"
        maxLength={4}
      />
      <InputField
        {...register('password')}
        id="password"
        type={showPassword ? 'text' : 'password'}
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        maxLength={30}
        icon={<Icon as={showPassword ? ViewOffIcon : ViewIcon} onClick={setShowPassword.toggle} />}
      />
      <Box w="100%" fontSize="sm">
        {isPasswordTooShort(password) && <Text fontWeight="light">· 8글자 이상으로만 입력할 수 있습니다.</Text>}
        {!isPasswordContainNumber(password) && <Text fontWeight="light">· 숫자를 반드시 포함해야 합니다.</Text>}
      </Box>
      <InputField
        {...register('confirmPassword')}
        id="confirm-password"
        type={showConfirmPassword ? 'text' : 'password'}
        label="비밀번호 확인"
        placeholder="비밀번호를 재확인해주세요"
        maxLength={30}
        error={errors.confirmPassword}
        icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
      />
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
        회원가입
      </Button>
      <LinkTemplate>
        <Text color="gray.400">이미 가입하셨었나요?</Text>
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
            로그인
          </Text>
        </Link>
      </LinkTemplate>
    </PageTemplate>
  );
};

export default SignUp;
