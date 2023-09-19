import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';
import { Heading, Image, Text, Button } from '@chakra-ui/react';
import musseuk_box from '@/assets/images/musseuk_box.png';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Suspense, useState } from 'react';
import useSlackTokenCheckQuery from '@/apis/queries/useSlackTokenCheckQuery';
import qs from 'qs';

const SlackConfirmation = () => {
  //const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const slackToken = String(queryString.token);

  const { data } = useSlackTokenCheckQuery(slackToken);

  return (
    <Suspense fallback={<Loading />}>
      <PageTemplateWithHeader>
        <Image maxW="56" src={musseuk_box} alt="머쓱이" />
        <Heading mt={'2rem'} fontSize={'2xl'} textAlign="center" wordBreak={'keep-all'}>
          🎉 슬랙 인증이 완료되었습니다 🎉
        </Heading>
        <Text color="gray.500">이제부터 편지 수신 알람을 슬랙에서 받을 수 있습니다.</Text>
        <Button
          onClick={() => {
            navigate('/');
          }}
          mt="24"
          w="100%"
          colorScheme="primary">
          메인페이지로 돌아가기
        </Button>
      </PageTemplateWithHeader>
    </Suspense>
  );
};

export default SlackConfirmation;
