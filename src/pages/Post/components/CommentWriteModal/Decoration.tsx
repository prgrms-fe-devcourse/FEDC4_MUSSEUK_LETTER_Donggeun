import { Box, BoxProps, Image, useRadio } from '@chakra-ui/react';
import { DecorationType } from '@/types';
import { DECORATION_IMAGE } from '../../constants';

type DecorationProps = {
  decoId: DecorationType;
} & BoxProps;

const Decoration = ({ decoId, ...props }: DecorationProps) => {
  const { state, getInputProps, getRadioProps, getLabelProps, htmlProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box
      as="label"
      {...htmlProps}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="7rem"
      h="7rem"
      border={state.isChecked ? '4px' : '1px'}
      borderColor={state.isChecked ? '#CDF400' : 'gray03'}
      borderRadius="1rem"
      backgroundColor={state.isChecked ? 'yellow.50' : 'white'}
      mb="2rem"
      mx="auto">
      <input {...input} />
      <Box {...checkbox}>
        <Image src={DECORATION_IMAGE[decoId]} alt={decoId} h="5rem" userSelect="none" {...getLabelProps()} />
      </Box>
    </Box>
  );
};

export default Decoration;
