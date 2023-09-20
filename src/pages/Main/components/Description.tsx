import { Heading, Box, Text } from '@chakra-ui/react';

const Description = () => {
  return (
    <>
      <Heading
        textAlign={{
          base: 'center',
          lg: 'start'
        }}
        mb={{
          base: 10,
          lg: 4,
          '2xl': 4
        }}
        fontSize={{
          base: '4xl'
        }}>
        데브코스 익명 편지 전송 서비스
      </Heading>
      <Box
        textAlign={{
          base: 'center',
          lg: 'start'
        }}>
        <Text fontSize="xl">팀원들에게 전하지 못한 말들이 있어 아쉽지 않으셨나요?</Text>
        <Text fontSize="xl">다른 사람의 머쓱이에게 편지를 남겨보세요!</Text>
        <br />
        <Text fontSize="xl"> 또는, 당신의 머쓱이를 만들어서 공유해보세요!</Text>
      </Box>
    </>
  );
};

export default Description;
