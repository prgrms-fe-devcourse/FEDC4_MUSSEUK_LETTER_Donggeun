import { Heading, HeadingProps } from '@chakra-ui/react';

const AnnouncementText = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading size="xl" maxW="45rem" wordBreak={'keep-all'} {...props}>
      {children}
    </Heading>
  );
};

export default AnnouncementText;
