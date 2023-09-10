import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';

const InputField = ({ icon, inputProps, mw }: { icon?: React.ReactNode; inputProps: InputProps; mw: string }) => {
  return (
    <InputGroup maxW={mw}>
      <Input
        w="100%"
        _placeholder={{ opacity: 1, color: 'gray03' }}
        borderRadius="10px"
        borderColor="blue01"
        {...inputProps}
      />
      {icon && (
        <InputRightElement h="100%" cursor="pointer">
          {icon}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InputField;
