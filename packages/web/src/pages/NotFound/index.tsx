import { useNavigate } from 'react-router-dom';
import { Flex, Button, Heading, Text, Image } from '@chakra-ui/react';
import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';
import notfound from '@/assets/images/404_notfound.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageTemplateWithHeader>
      <Image
        maxW={{
          base: '52',
          sm: '72',
          xl: '96'
        }}
        src={notfound}
        alt="머쓱이"
      />
      <Heading textAlign="center">이런!</Heading>
      <Heading mb="5" color="gray.400" fontSize="lg" textAlign="center">
        404 Page Not Found
      </Heading>
      <Flex direction="column" textAlign="center" fontWeight="light" fontSize="lg">
        <Text>아쉽지만</Text>
        <Text>여긴 당신이 찾는 주소가 아니에요.</Text>
      </Flex>
      <Button mt="6" w="100%" colorScheme="primary" onClick={() => navigate(-1)}>
        이전 페이지로 돌아가기
      </Button>
    </PageTemplateWithHeader>
  );
};

export default NotFound;
