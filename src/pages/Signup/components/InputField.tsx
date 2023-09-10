import { InputGroup, Input, InputRightElement, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputField = ({
  label,
  error,
  inputProps,
  registerProps,
  icon
}: {
  label: string;
  error?: FieldError;
  inputProps: InputProps;
  registerProps?: UseFormRegisterReturn;
  icon?: React.ReactNode;
}) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel htmlFor={inputProps.id} fontWeight="semibold">
        {label}
      </FormLabel>
      <InputGroup>
        <Input fontFamily="inherit" w="100%" borderColor="blue01" {...inputProps} {...registerProps} />
        {icon && <InputRightElement cursor="pointer">{icon}</InputRightElement>}
      </InputGroup>
      <FormErrorMessage fontSize="sm" color="red01">
        {error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
