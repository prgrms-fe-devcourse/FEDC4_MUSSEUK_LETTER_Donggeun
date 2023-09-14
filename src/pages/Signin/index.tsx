import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Image, Heading, Button, Text, Flex } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import useSigninMutation from '@/apis/mutations/useSigninMutation';
import musseuk from '@/assets/images/musseuk_hood.png';
import InputField from '@/pages/Signup/components/InputField';
import { PageTemplate, LinkTemplate } from '@/pages/Signup/templates';

const links = {
  main: '/',
  signup: '/signup'
};

const formSchema = z.object({ email: z.string().email(), password: z.string() });

type Inputs = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();

  const { data: user } = useAuthCheckQuery();
  const { mutate } = useSigninMutation();

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
        onSuccess: () => navigate(links.main),
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          setError('email', { type: 'server', message: errorMessage });
          setError('password', { type: 'server', message: errorMessage });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  if (user) return <Navigate to={links.main} />;

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
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
        {...register('email')}
        id="email"
        type="email"
        label="Email"
        error={errors.email}
        placeholder="이메일을 입력해주세요"
      />
      <InputField
        {...register('password')}
        id="password"
        type="password"
        label="Password"
        error={errors.password}
        placeholder="비밀번호를 입력해주세요"
        maxLength={30}
      />
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
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
