import { FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

type Props = ComponentProps<typeof Input> & {
  icon?: React.ReactNode;
};

const InputField = forwardRef(({ icon, ...props }: Props, ref) => {
  return (
    <FormControl>
      <InputGroup>
        <Input
          ref={ref}
          required={true}
          w="100%"
          _placeholder={{ opacity: 1, color: 'gray03' }}
          borderRadius="10px"
          borderColor="blue01"
          {...props}
        />
        {icon && (
          <InputRightElement h="100%" cursor="pointer">
            {icon}
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
});

InputField.displayName = 'InputField';

export default InputField;
