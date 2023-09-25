import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import { Heading, Text } from '@chakra-ui/react';

type IntroductionProps = {
  postId: string;
};

const Introduction = ({ postId }: IntroductionProps) => {
  const { data } = usePostDetailQuery(postId, { suspense: true });

  return (
    <>
      <Heading maxW={'min(80vw, 40rem)'} fontSize={{ base: 24, md: 30 }} mb="1rem">
        {data?.title}
      </Heading>
      <Text maxW={'min(80vw, 40rem)'} fontSize={{ base: 18, md: 24 }} wordBreak="keep-all" whiteSpace={'pre-wrap'}>
        {data?.content}
      </Text>
    </>
  );
};

export default Introduction;
