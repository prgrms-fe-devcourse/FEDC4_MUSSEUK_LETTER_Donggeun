import { Heading, HeadingProps } from '@chakra-ui/react';

const AnnouncementText = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading size="xl" maxW="45rem" {...props}>
      {children}
    </Heading>
  );
};

export default AnnouncementText;
