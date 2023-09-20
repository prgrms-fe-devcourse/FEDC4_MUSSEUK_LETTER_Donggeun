import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const CommentBoardSkeleton = () => {
  return (
    <Box position={'relative'} w={'90vw'} maxW={'45rem'} h={'90vw'} maxH={'45rem'}>
      <Skeleton
        position={'absolute'}
        top={'20%'}
        left={'50%'}
        w={'35%'}
        h={'20%'}
        borderRadius={'50% 50% 0 0 / 90% 90% 0 0'}
      />
      <Skeleton
        position={'absolute'}
        top={'32%'}
        left={'73%'}
        w={'20%'}
        h={'5%'}
        borderTopRightRadius={'100%'}
        transform={'rotate(-7deg) skewX(30deg)'}
      />
      <Skeleton
        position={'absolute'}
        top={'40%'}
        left={'20%'}
        w={'67%'}
        h={'40%'}
        borderRadius={'55% 5% 70% 0 / 100% 20% 100% 0'}
      />
      <Skeleton
        position={'absolute'}
        top={'27%'}
        left={'20%'}
        w={'25%'}
        h={'25%'}
        borderBottomLeftRadius={'30%'}
        transform={'rotate(50deg)'}
      />
      <Skeleton
        position={'absolute'}
        top={'13%'}
        left={'36%'}
        w={'13%'}
        h={'18%'}
        borderTopLeftRadius={'40%'}
        transform={'rotate(20deg) skew(-30deg)'}
      />
      <Skeleton
        position={'absolute'}
        top={'70%'}
        left={'10%'}
        w={'10%'}
        h={'10%'}
        borderRadius={'100% 0 0 50% / 100% 0 0 15%'}
      />
    </Box>
  );
};

export default CommentBoardSkeleton;
