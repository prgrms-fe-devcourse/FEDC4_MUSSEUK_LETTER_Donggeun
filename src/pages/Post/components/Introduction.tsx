import usePostDetailQuery from '@/apis/queries/usePostDetailQuery';
import { Heading, Text } from '@chakra-ui/react';

type IntroductionProps = {
  postId: string;
};

const Introduction = ({ postId }: IntroductionProps) => {
  const { data } = usePostDetailQuery(postId, { suspense: true });

  return (
    <>
      <Heading mb="1rem">{data?.title}</Heading>
      <Text maxW="40rem" fontSize="lg" wordBreak="keep-all">
        {data?.content}
      </Text>
    </>
  );
};

export default Introduction;
