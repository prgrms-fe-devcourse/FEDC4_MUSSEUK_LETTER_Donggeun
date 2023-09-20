import { ComponentProps } from 'react';
import { Image, Box } from '@chakra-ui/react';

const MusseukItem = ({ ...props }: ComponentProps<typeof Image>) => {
  return (
    <Box flex="1" border="0.3rem solid transparent" borderRadius="10px" _hover={{ borderColor: '#72D988' }}>
      <Image objectFit="cover" w="100%" h="100%" {...props} />
    </Box>
  );
};

export default MusseukItem;
