import { Box, BoxProps, Image } from '@chakra-ui/react';
import { DecorationType } from '@/types';
import { DECORATION_IMAGE } from '../../constants';

type DecorationProps = {
  decoId: DecorationType;
  selectedDeco: DecorationType | null;
} & BoxProps;

const Decoration = ({ decoId, selectedDeco, ...props }: DecorationProps) => {
  const isSelected = decoId === selectedDeco;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="7rem"
      h="7rem"
      border={isSelected ? '4px' : '1px'}
      borderColor={isSelected ? '#CDF400' : 'gray03'}
      borderRadius="1rem"
      backgroundColor={isSelected ? 'yellow.50' : 'white'}
      mb="2rem"
      mx="auto"
      {...props}>
      <Image src={DECORATION_IMAGE[decoId]} alt={decoId} h="5rem" userSelect="none" />
    </Box>
  );
};

export default Decoration;
