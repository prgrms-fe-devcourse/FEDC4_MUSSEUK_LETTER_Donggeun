import { authCheckOption } from '@/apis/queries/useAuthCheckQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postDetailQueryOption } from '@/apis/queries/usePostDetailQuery';
import { Heading, HeadingProps, Text } from '@chakra-ui/react';

type AnnouncementTextProps = {
  postId: string;
} & HeadingProps;

const AnnouncementText = ({ postId, ...props }: AnnouncementTextProps) => {
  const { data: postData } = useSuspenseQuery({ ...postDetailQueryOption(postId) });
  const { data: userData } = useSuspenseQuery({ ...authCheckOption });

  const isAuthor = !!userData && !!postData && userData._id === postData.author._id;

  return (
    <Heading fontSize={{ base: 24, md: 30 }} w={'67vw'} maxW="45rem" wordBreak={'keep-all'} {...props}>
      {isAuthor ? (
        <>
          {postData?.author.username} 님에게{' '}
          <Text display="inline" color="red.400">
            {postData?.comments.length}
          </Text>
          개의 편지가 전달됐어요!
        </>
      ) : (
        <>
          원하는{' '}
          <Text display={'inline'} color={'green03'}>
            위치
          </Text>
          를 클릭해서 {postData?.author.username} 님의 머쓱이에게 편지를 남겨주세요.
        </>
      )}
    </Heading>
  );
};

export default AnnouncementText;
