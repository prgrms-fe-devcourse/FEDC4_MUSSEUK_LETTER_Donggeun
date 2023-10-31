import { Box, Flex, Image, Icon, useMediaQuery, Select, FormControl, HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import logo from '@/assets/images/logo.png';
import logo_mobile from '@/assets/images/logo_mobile.png';
import InputField from '@/components/header/components/Input';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './components/Button';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import HeaderMenu from './components/Menu';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const HEADER_HEIGHT = '4rem';

const formSchema = z.object({
  keyword: z.string().trim().min(1),
  searchType: z.string().trim()
});

type InputValue = z.infer<typeof formSchema>;

const Header = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const logoSrc = isMobile ? logo_mobile : logo;
  const navigate = useNavigate();

  const { handleSubmit, register, reset, control } = useForm<InputValue>({
    resolver: zodResolver(formSchema)
  });
  const { data } = useAuthCheckQuery();

  const onSubmit: SubmitHandler<InputValue> = (value: { searchType: string; keyword: string }) => {
    navigate(`/search/?searchType=${value.searchType}&keyword=${value.keyword}`);
    reset();
  };

  return (
    <Box h={HEADER_HEIGHT} px={5} bg={'white'}>
      <Flex gap={4} alignItems={'center'} h="100%" justifyContent={'space-between'}>
        <Image h={8} cursor="pointer" src={logoSrc} alt="logo" onClick={() => navigate('/')} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack gap={'0'} w={'40rem'}>
            <FormControl w="15%">
              <Controller
                defaultValue="user"
                name="searchType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    borderRadius="10px 0 0 10px"
                    borderColor="blue01"
                    bg="blue01"
                    placeholder="검색 기준"
                    cursor="pointer">
                    <option value="user">사용자</option>
                    <option value="post">머쓱이</option>
                  </Select>
                )}
              />
            </FormControl>
            <InputField
              {...register('keyword')}
              icon={<Icon as={SearchIcon} onClick={handleSubmit(onSubmit)} />}
              id="keyword"
              placeholder="사용자 이름을 입력해 주세요"
              size="md"
              fontSize="14px"
              fontWeight="normal"
            />
          </HStack>
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
