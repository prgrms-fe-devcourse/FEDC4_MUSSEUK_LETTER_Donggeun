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
  UseDisclosureReturn,
  useMultiStyleConfig,
  useTab
} from '@chakra-ui/react';
import React, { Suspense, useState } from 'react';
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

  const handlePrevButton = () => {
    setTabIndex((tab) => tab - 1);
  };

  const handleNextButton = () => {
    setTabIndex((tab) => tab + 1);
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
            <TabList borderBottom={0} px={5}>
              <CustomTab></CustomTab>
              <CustomTab></CustomTab>
              <CustomTab></CustomTab>
              <CustomTab></CustomTab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DrawerBody
                  textAlign={'center'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  h={'22rem'}
                  overflowY={'auto'}
                  p={0}>
                  <Suspense fallback={<IntroductionSkeleton />}>
                    <Introduction postId={postId} />
                  </Suspense>
                </DrawerBody>
                <DrawerFooter display={'flex'} justifyContent={'center'} p={0}>
                  <Button colorScheme="primary" w={'15rem'} h={'3rem'} fontSize={20} onClick={handleNextButton}>
                    편지 작성하기
                  </Button>
                </DrawerFooter>
              </TabPanel>
              <TabPanel>
                <DrawerBody
                  textAlign={'center'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  h={'22rem'}
                  overflowY={'auto'}
                  p={0}>
                  <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }} mb={'1rem'}>
                    장식을 머쓱이 위로 드래그해주세요
                  </Heading>
                  <DecorationList />
                </DrawerBody>
                <DrawerFooter display={'flex'} justifyContent={'end'} gap={'2rem'} p={0}>
                  <Button colorScheme="blackAlpha" w={'8rem'} h={'3rem'} fontSize={20} onClick={handlePrevButton}>
                    이전
                  </Button>
                  <Button colorScheme="primary" w={'8rem'} h={'3rem'} fontSize={20} onClick={handleNextButton}>
                    다음
                  </Button>
                </DrawerFooter>
              </TabPanel>
              <TabPanel>
                <DrawerBody
                  textAlign={'center'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  h={'22rem'}
                  overflowY={'auto'}
                  p={0}>
                  <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }} mb={'1rem'}>
                    메세지를 작성해주세요
                  </Heading>
                  <Heading fontSize={{ base: 20, md: 24 }} mb={'0.5rem'}>
                    오늘 발표 어떠셨나요?
                  </Heading>
                  <Textarea
                    w="90%"
                    h="10rem"
                    _placeholder={{ opacity: 1, color: 'gray03' }}
                    placeholder="소감을 적어주세요!"
                    borderRadius="10px"
                    borderColor="gray03"
                    bgColor="white"
                    fontSize={18}
                  />
                  <TextCount count={100} maxLength={MAX_LENGTH.CONTENT} />
                </DrawerBody>
                <DrawerFooter display={'flex'} justifyContent={'end'} gap={'2rem'} p={0}>
                  <Button colorScheme="blackAlpha" w={'8rem'} h={'3rem'} fontSize={20} onClick={handlePrevButton}>
                    이전
                  </Button>
                  <Button colorScheme="primary" w={'8rem'} h={'3rem'} fontSize={20} onClick={handleNextButton}>
                    다음
                  </Button>
                </DrawerFooter>
              </TabPanel>
              <TabPanel>
                <DrawerBody
                  textAlign={'center'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'center'}
                  h={'22rem'}
                  overflowY={'auto'}
                  p={0}>
                  <Heading textColor={'black01'} fontSize={{ base: 24, md: 30 }} mb={'1rem'}>
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
                </DrawerBody>
                <DrawerFooter display={'flex'} justifyContent={'end'} gap={'2rem'} p={0}>
                  <Button colorScheme="blackAlpha" w={'8rem'} h={'3rem'} fontSize={20} onClick={handlePrevButton}>
                    이전
                  </Button>
                  <Button colorScheme="primary" w={'8rem'} h={'3rem'} fontSize={20}>
                    작성
                  </Button>
                </DrawerFooter>
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

const CustomTab = React.forwardRef<HTMLElement>((props, ref) => {
  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button __css={styles.tab} {...tabProps} p={1} _selected={{}}>
      <Box as="span">
        {isSelected ? (
          <Box w={'1rem'} h={'1rem'} rounded={'1rem'} bgColor={'green01'} />
        ) : (
          <Box w={'1rem'} h={'1rem'} rounded={'1rem'} bgColor={'gray.300'} />
        )}
      </Box>
      {tabProps.children}
    </Button>
  );
});

CustomTab.displayName = 'CustomTab';

export default CommentWriteDrawer;
