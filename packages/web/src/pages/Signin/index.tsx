import { Link, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import qs from 'qs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Image, Heading, Button, Text, Flex, Spinner } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import useSigninMutation from '@/apis/mutations/useSigninMutation';
import useIsNotLoggedIn from '@/hooks/useIsNotLoggedIn';
import musseuk from '@/assets/images/musseuk_hood.png';
import PageTemplate from '@/components/WhiteCard/PageTemplate';
import InputField from '@/pages/Signup/components/InputField';
import { LinkTemplate } from '@/pages/Signup/templates';

const ERROR_MESSAGE: {
  [key: string]: string;
} = {
  'Your email and password combination does not match an account.':
    '해당 이메일과 비밀번호로 일치하는 계정이 존재하지 않습니다.'
};

const links = {
  main: '/',
  signup: '/signup'
};

const formSchema = z.object({
  email: z.string().email('이메일 주소 형태로만 입력할 수 있습니다.'),
  password: z.string()
});

type Inputs = z.infer<typeof formSchema>;

const SignIn = () => {
  const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const redirectTo = String(queryString.redirectTo || links.main);

  const { isNotLoggedIn } = useIsNotLoggedIn();
  const { mutate, isPending } = useSigninMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          setError('password', { type: 'server', message: ERROR_MESSAGE[errorMessage] || errorMessage });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  if (!isNotLoggedIn) return <Navigate to={redirectTo} />;

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading textAlign="center">로그인</Heading>
      <Flex
        color="gray.500"
        direction={{
          base: 'column',
          sm: 'row'
        }}
        justifyContent="center"
        alignItems="center"
        fontSize="lg"
        gap="1"
        wordBreak="keep-all"
        textAlign="center"
        fontWeight="light">
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" gap="1">
          <Text>당신의</Text>
          <Text>마음을</Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" gap="1">
          <Text>전달하는</Text>
          <Text>머쓱;레터</Text>
          <EmailIcon ml="1" />
        </Flex>
      </Flex>
      <InputField
        {...register('email')}
        id="email"
        type="email"
        label="이메일"
        error={errors.email}
        placeholder="이메일을 입력해주세요"
      />
      <InputField
        {...register('password')}
        id="password"
        type="password"
        label="비밀번호"
        error={errors.password}
        placeholder="비밀번호를 입력해주세요"
        maxLength={30}
      />
      <Button
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
        spinner={<Spinner size="sm" mr="2" />}
        loadingText="로그인 중..."
        mt="6"
        w="100%"
        colorScheme="primary">
        로그인
      </Button>
      <LinkTemplate>
        <Text color="gray.400">아직 가입하지 않으셨나요?</Text>
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
            회원가입
          </Text>
        </Link>
      </LinkTemplate>
    </PageTemplate>
  );
};

export default SignIn;
