import { useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBoolean, useToast, Box, Button, Icon, Heading, Text, Image, Spinner } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useChangePasswordMutation from '@/apis/mutations/useChangePasswordMutation';
import useIsNotLoggedIn from '@/hooks/useIsNotLoggedIn';
import musseuk from '@/assets/images/musseuk_hood.png';
import { isPasswordTooShort, isPasswordContainNumber } from '@/pages/Signup/helpers/password';
import InputField from '@/pages/Signup/components/InputField';
import { LinkTemplate } from '@/pages/Signup/templates';
import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';

const links = {
  signin: '/signin'
};

const formSchema = z
  .object({
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

const ChangePassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { isNotLoggedIn } = useIsNotLoggedIn();
  const { mutate, isPending } = useChangePasswordMutation();

  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema)
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      { password: data.password },
      {
        onSuccess: () => {
          toast({
            title: '비밀번호가 변경되었어요!',
            status: 'success',
            position: 'top'
          });
          navigate(-1);
        },
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          toast({
            title: errorMessage,
            status: 'error',
            position: 'top'
          });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  if (isNotLoggedIn) return <Navigate to={links.signin} />;

  return (
    <PageTemplateWithHeader onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading size="lg" textAlign="center">
        비밀번호 변경
      </Heading>
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
        icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
        error={errors.confirmPassword}
      />
      <Button
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
        spinner={<Spinner size="sm" mr="2" />}
        loadingText="변경중..."
        mt="6"
        w="100%"
        colorScheme="primary">
        비밀번호 변경
      </Button>
      <LinkTemplate>
        <Text color="gray.400">비밀번호 변경을 원하지 않으신가요?</Text>
        <Text
          onClick={() => navigate(-1)}
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
          돌아가기
        </Text>
      </LinkTemplate>
    </PageTemplateWithHeader>
  );
};

export default ChangePassword;
