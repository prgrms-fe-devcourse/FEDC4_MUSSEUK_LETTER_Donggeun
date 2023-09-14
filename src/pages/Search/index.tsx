import { Box, Heading, Text, Flex, VStack, List, HStack, Container } from '@chakra-ui/react';
import UserCard from './components/UserCard';
import { useParams } from 'react-router-dom';
import useSearchUserQuery from '@/apis/queries/useSearchUserQuery';

const Search = () => {
  const { keyword = '' } = useParams();
  const { data: searchList } = useSearchUserQuery(keyword);

  return (
    <VStack spacing={12} mb={10}>
      <Box w="100%" bgGradient="linear-gradient(180deg, #C6FFC1 0%, #F5FFE2 100%)" p="3rem">
        <Flex flexDirection={'column'} gap={4}>
          <Heading mb={4}>데브코스 익명 편지 전송 서비스</Heading>
          <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
          <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
          <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요! </Text>
        </Flex>
      </Box>
      <HStack gap={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          &ldquo;{keyword}&ldquo;
        </Text>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          검색결과
        </Text>
      </HStack>
      <Container centerContent minW={'28rem'} maxW={'54rem'} gap={8}>
        {searchList &&
          searchList.map((user) => (
            <List width={'100%'} key={user.email}>
              <UserCard
                id={user._id}
                name={user.fullName}
                email={user.email}
                post={user.posts.length}
                comment={user.comments.length}
              />
            </List>
          ))}
      </Container>
    </VStack>
  );
};

export default Search;
