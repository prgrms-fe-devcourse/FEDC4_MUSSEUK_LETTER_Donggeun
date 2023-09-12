import { forwardRef, ComponentProps } from 'react';
import { InputGroup, Input, InputRightElement, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import type { FieldError } from 'react-hook-form';

type Props = ComponentProps<typeof Input> & {
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
};

const InputField = forwardRef(({ label, error, icon, ...props }: Props, ref) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel htmlFor={props.id} fontWeight="semibold">
        {label}
      </FormLabel>
      <InputGroup>
        <Input ref={ref} w="100%" borderColor="blue01" fontWeight="light" {...props} />
        {icon && <InputRightElement cursor="pointer">{icon}</InputRightElement>}
      </InputGroup>
      <FormErrorMessage fontSize="sm" color="red01">
        {error?.message}
      </FormErrorMessage>
    </FormControl>
  );
});

InputField.displayName = 'InputField';

export default InputField;
