import { Box, BoxProps, Image } from '@chakra-ui/react';
import { DecorationType } from '../../constants';
import Beer1 from '@/assets/images/decoration_beer1.png';
import Chicken1 from '@/assets/images/decoration_chicken1.png';
import Coffee1 from '@/assets/images/decoration_coffee1.png';
import Glasses1 from '@/assets/images/decoration_glasses1.png';
import Hat1 from '@/assets/images/decoration_hat1.png';
import Medal1 from '@/assets/images/decoration_medal1.png';
import Soju1 from '@/assets/images/decoration_soju1.png';
import Uh1 from '@/assets/images/decoration_uh1.png';

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
      <Image src={decoImage[decoId]} alt={decoId} h="5rem" userSelect="none" />
    </Box>
  );
};

const decoImage = {
  decoration_beer1: Beer1,
  decoration_chicken1: Chicken1,
  decoration_coffee1: Coffee1,
  decoration_glasses1: Glasses1,
  decoration_hat1: Hat1,
  decoration_medal1: Medal1,
  decoration_soju1: Soju1,
  decoration_uh1: Uh1
};

export default Decoration;
