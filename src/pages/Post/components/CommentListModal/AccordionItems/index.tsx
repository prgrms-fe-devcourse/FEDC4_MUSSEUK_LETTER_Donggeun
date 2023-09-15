import { CommentField } from '@/types';
import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';

const AccordionItems = ({ nickname, content }: Pick<CommentField, 'nickname' | 'content'>) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton height={'4rem'} _hover={{ bg: 'gray02' }} _expanded={{ bg: 'gray02' }}>
          <Box as="span" flex="1" textAlign="left">
            {nickname}
          </Box>
          <AccordionIcon w={'24px'} h={'24px'} />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{content}</AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItems;
