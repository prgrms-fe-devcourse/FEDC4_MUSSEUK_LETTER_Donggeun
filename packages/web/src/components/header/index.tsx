import { Box, Flex, Image, Icon, useMediaQuery } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/images/logo.png';
import logo_mobile from '@/assets/images/logo_mobile.png';
import InputField from '@/components/header/components/Input';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './components/Button';
import { authCheckOption } from '@/apis/queries/useAuthCheckQuery';
import { SubmitHandler, useForm } from 'react-hook-form';
import HeaderMenu from './components/Menu';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const HEADER_HEIGHT = '4rem';

const formSchema = z.object({
  keyword: z.string().trim().min(1)
});

type InputValue = z.infer<typeof formSchema>;

const Header = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const logoSrc = isMobile ? logo_mobile : logo;
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm<InputValue>({
    resolver: zodResolver(formSchema)
  });
  const { data } = useQuery({ ...authCheckOption });

  const onSubmit: SubmitHandler<InputValue> = (value: { keyword: string }) => {
    navigate(`/search/${value.keyword}`);
    reset();
  };

  return (
    <Box h={HEADER_HEIGHT} px={5} bg={'white'}>
      <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
        <Image h={8} cursor="pointer" src={logoSrc} alt="logo" onClick={() => navigate('/')} />
        <form style={{ width: '40rem' }} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register('keyword')}
            icon={<Icon as={SearchIcon} onClick={handleSubmit(onSubmit)} />}
            id="keyword"
            placeholder="사용자 이름을 입력해 주세요"
            size="md"
            fontSize="14px"
            fontWeight="normal"
          />
        </form>
        {data?._id ? (
          <HeaderMenu />
        ) : (
          <PrimaryButton px={6} onClick={() => navigate('/signin')}>
            로그인
          </PrimaryButton>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
