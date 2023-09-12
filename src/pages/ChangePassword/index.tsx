import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Icon, Heading, Text, Image, useBoolean } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import useChangePasswordMutation from '@/apis/mutations/useChangePasswordMutation';
import musseuk from '@/assets/images/musseuk_hood.png';
import { isPasswordTooShort, isPasswordContainNumber } from '@/pages/Signup/helpers/password';
import InputField from '@/pages/Signup/components/InputField';
import { PageTemplate, LinkTemplate } from '@/pages/Signup/templates';

const links = {
  back: '..'
};

const formSchema = z
  .object({
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const { mutate } = useChangePasswordMutation();
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
          toast.success('비밀번호가 변경되었어요!', { position: 'top-center' });
          navigate(links.back);
        },
        onError: (error) => {
          const errorMessage = typeof error.response?.data === 'string' ? error.response?.data : '';
          toast.error(errorMessage, { position: 'top-center' });
        }
      }
    );
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => console.error(errors);

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk} alt="머쓱이" />
      <Heading size="lg" textAlign="center">
        Change Password
      </Heading>
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
        icon={<Icon as={showConfirmPassword ? ViewOffIcon : ViewIcon} onClick={setShowConfirmPassword.toggle} />}
        error={errors.confirmPassword}
      />
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
        Change password
      </Button>
      <LinkTemplate>
        <Text color="gray.400">Not want to change the password?</Text>
        <Link to={links.back}>
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
            Back
          </Text>
        </Link>
      </LinkTemplate>
    </PageTemplate>
  );
};

export default ChangePassword;
