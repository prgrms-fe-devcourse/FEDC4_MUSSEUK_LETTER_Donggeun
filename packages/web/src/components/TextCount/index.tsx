import { Text, TextProps } from '@chakra-ui/react';

type TextCountProps = {
  count: number;
  maxLength: number;
} & TextProps;

const TextCount = ({ count, maxLength, ...props }: TextCountProps) => {
  const isExceeded = count > maxLength;

  return (
    <Text fontWeight={'light'} color={isExceeded ? 'orange.400' : 'inherit'} w={'90%'} textAlign={'right'} {...props}>
      {`${count}/${maxLength}자`}
    </Text>
  );
};

export default TextCount;
