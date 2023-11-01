import {
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  UseDisclosureReturn
} from '@chakra-ui/react';
import { Suspense, useState } from 'react';
import IntroductionSkeleton from './Skeletons/IntroductionSkeleton';
import Introduction from './Introduction';
import DecorationList from './CommentWriteModal/DecorationList';
import TextCount from '@/components/TextCount';
import { MAX_LENGTH } from '../constants';

type CommentWriteDrawerProps = {
  postId: string;
} & Pick<UseDisclosureReturn, 'isOpen' | 'onOpen' | 'onClose'>;

const CommentWriteDrawer = ({ isOpen, onOpen, onClose, postId }: CommentWriteDrawerProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <DrawerHead onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="bottom" onClose={() => {}} blockScrollOnMount={false}>
        <DrawerOverlay display={'none'} />
        <DrawerContent w={'95%'} mx={'auto'} borderTopRadius={'1rem'} shadow={'upper'} bgColor={'bg01'}>
          <DrawerHeader>
            <DrawerHead w={'100%'} pos={'absolute'} top={0} left={0} shadow={'none'} onClick={onClose} />
          </DrawerHeader>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>1</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
              <Tab>4</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DrawerBody
                  textAlign={'center'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  h={'15rem'}
                  overflowY={'auto'}>
                  <Suspense fallback={<IntroductionSkeleton />}>
                    <Introduction postId={postId} />
                  </Suspense>
                </DrawerBody>
                <DrawerFooter display={'flex'} justifyContent={'center'}>
                  <Button colorScheme="primary" w={'15rem'} h={'3rem'} fontSize={20}>
                    편지 작성하기
                  </Button>
                </DrawerFooter>
              </TabPanel>
              <TabPanel>
                <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }}>
                  장식을 선택해주세요
                </Heading>
                <DecorationList />
              </TabPanel>
              <TabPanel>
                <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }}>
                  메세지를 작성해주세요
                </Heading>
                <Textarea
                  w="90%"
                  h="10rem"
                  _placeholder={{ opacity: 1, color: 'gray03' }}
                  borderRadius="10px"
                  borderColor="gray03"
                  bgColor="white"
                  fontSize={18}
                />
                <TextCount count={100} maxLength={MAX_LENGTH.CONTENT} />
              </TabPanel>
              <TabPanel>
                <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }} mt={'1rem'}>
                  수신자에게 보여줄 닉네임
                </Heading>
                <Input
                  maxLength={MAX_LENGTH.NICKNAME}
                  placeholder="익명의 머쓱이"
                  w="90%"
                  _placeholder={{ opacity: 1, color: 'gray03' }}
                  borderRadius="10px"
                  borderColor="gray03"
                  bgColor="white"
                  fontSize={16}
                />
                <TextCount count={5} maxLength={MAX_LENGTH.NICKNAME} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const DrawerHead = ({ ...props }: BoxProps) => {
  return (
    <Box
      w={'95%'}
      h={'2rem'}
      pos={'fixed'}
      bottom={0}
      left={'2.5%'}
      bgColor={'bg01'}
      shadow={'upper'}
      zIndex={10}
      borderTopRadius={'1rem'}
      cursor={'pointer'}
      {...props}>
      <Box w={'40%'} maxW={'20rem'} h={1.5} mx={'auto'} mt={'0.5rem'} bgColor={'gray02'} borderRadius={'full'} />
    </Box>
  );
};

export default CommentWriteDrawer;
