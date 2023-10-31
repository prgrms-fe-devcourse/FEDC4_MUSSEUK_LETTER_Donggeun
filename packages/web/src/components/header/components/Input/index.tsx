import { FormControl, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';

type Props = ComponentProps<typeof Input> & {
  icon?: React.ReactNode;
};

const InputField = forwardRef(({ icon, ...props }: Props, ref) => {
  return (
    <HStack width={'85%'} gap={0}>
      <FormControl>
        <InputGroup>
          <Input
            ref={ref}
            required={true}
            w="100%"
            _placeholder={{ opacity: 1, color: 'gray03' }}
            borderRadius="0 10px 10px 0"
            borderLeft="0"
            borderColor="blue01"
            {...props}
          />
          <InputRightElement h="100%" cursor="pointer">
            {icon}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </HStack>
  );
});

InputField.displayName = 'InputField';

export default InputField;
