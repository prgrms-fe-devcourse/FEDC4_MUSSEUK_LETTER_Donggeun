import { SkeletonText } from '@chakra-ui/react';

const IntroductionSkeleton = () => {
  return (
    <>
      <SkeletonText noOfLines={1} skeletonHeight={24} />
      <SkeletonText noOfLines={3} skeletonHeight={18} />
    </>
  );
};

export default IntroductionSkeleton;
