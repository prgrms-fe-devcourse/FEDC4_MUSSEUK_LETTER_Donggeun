import { VStack, InputGroup, Input, InputRightElement, Text } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';

const InputField = ({
  label,
  errorMessage,
  inputProps,
  registerProps,
  icon
}: {
  label: string;
  errorMessage?: string;
  inputProps: InputProps;
  registerProps?: UseFormRegisterReturn;
  icon?: React.ReactNode;
}) => {
  return (
    <VStack w="100%" align="start">
      <Text as="label" fontWeight="semibold" htmlFor={inputProps.id}>
        {label}
      </Text>
      <InputGroup>
        <Input w="100%" borderColor="var(--blue01)" {...inputProps} {...registerProps} />
        {icon && <InputRightElement cursor="pointer">{icon}</InputRightElement>}
      </InputGroup>
      {errorMessage && (
        <Text fontSize="sm" color="var(--red01)">
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default InputField;
