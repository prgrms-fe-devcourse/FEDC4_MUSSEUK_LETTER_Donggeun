import { Box, Heading, Text, VStack, List, HStack, Container, Grid } from '@chakra-ui/react';
import UserCard from './components/UserCard';
import qs from 'qs';
import useSearchUserQuery from '@/apis/queries/useSearchUserQuery';
import useGetPostsInfoQuery from '@/apis/queries/useGetPostsInfoQuery';
import PostCard from '@/components/PostCard';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const searchType = String(queryString.searchType);
  const keyword = String(queryString.keyword);
  const navigate = useNavigate();

  const { data: searchUserList } = useSearchUserQuery(keyword);
  const { data: searchPostList } = useGetPostsInfoQuery({ suspense: true });
  return (
    <VStack spacing={12} mb={10}>
      <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
        <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
        <br />
        <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
        <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
        <br />
        <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
      </Box>
      <HStack gap={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          &ldquo;{keyword}&ldquo;
        </Text>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          검색결과
        </Text>
      </HStack>
      {searchType === 'user' ? (
        <Container centerContent maxW={'54rem'} gap={8}>
          {searchUserList &&
            searchUserList.map((user) => (
              <List width={'100%'} key={user.email}>
                <UserCard
                  id={user._id}
                  name={user.username}
                  email={user.email}
                  post={user.postCount}
                  comment={user.commentCount}
                />
              </List>
            ))}
        </Container>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={8} gridAutoFlow={'row'}>
          {searchPostList &&
            searchPostList.map((post) => (
              <List width={'100%'} key={post._id}>
                <PostCard
                  onClick={() => navigate(`/post/${post._id}`)}
                  imgName={post.musseukImageName}
                  musseukContent={post.content}
                  musseukName={post.title}
                  userName={post.author.username}
                  letter={post.comments.length}
                />
              </List>
            ))}
        </Grid>
      )}
    </VStack>
  );
};

export default Search;
