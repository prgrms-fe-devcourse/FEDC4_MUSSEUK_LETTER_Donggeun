import { PageTemplate } from '@/pages/Signup/templates';
import { Image, Heading, Button, FormControl, RadioGroup, Radio, VStack, Text, Stack } from '@chakra-ui/react';
import musseuk_slack from '@/assets/images/musseuk_slack.png';
import InputField from '@/pages/Signup/components/InputField';
import { QuestionIcon } from '@chakra-ui/icons';
import useGenerateSlackLinkMutation from '@/apis/mutations/useGenerateSlackLinkMutation';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import LinkField from './components/LinkField';
import { SLACK_ID_DESCRIPTION } from '@/pages/Setting/Slack/constants/index';
import { SlackWorkspace } from '@/types';
import { z } from 'zod';
import { SLACK_WORKSPACE } from '@/constants/slack';

const formSchema = z.object({
  slackId: z.string(),
  slackWorkspace: z.enum(SLACK_WORKSPACE)
});

type FormValues = z.infer<typeof formSchema>;

const SettingSlack = () => {
  const { mutate } = useGenerateSlackLinkMutation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    mutate({ slackId: data.slackId, slackWorkspace: data.slackWorkspace });
  };

  return (
    <PageTemplate onSubmit={handleSubmit(onSubmit)}>
      <Image maxW="32" src={musseuk_slack} alt="머쓱이" />
      <Heading fontSize={'3xl'} textAlign="center" wordBreak={'keep-all'}>
        슬랙 인증을 통해 편지 알림을 슬랙으로 받아보세요
      </Heading>
      <FormControl>
        <Controller
          defaultValue="Frontend"
          name="devcourse"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} display={'flex'} w={'100%'} gap={2} my={8}>
              <VStack gap={2} w={'100%'} alignItems={'start'}>
                <Text>데브코스</Text>
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="primary" borderColor={'gray.200'} value="Frontend">
                    프론트엔드
                  </Radio>
                  <Radio colorScheme="primary" borderColor={'gray.200'} value="Backend">
                    백엔드
                  </Radio>
                </Stack>
              </VStack>
            </RadioGroup>
          )}
        />
      </FormControl>
      <InputField
        {...register('slackId')}
        id="slackId"
        label="Slack Id"
        placeholder="슬랙 아이디를 입력해주세요"
        maxLength={40}
      />
      <LinkField title="노션 페이지로 이동" href={SLACK_ID_DESCRIPTION}>
        <QuestionIcon color={'primary.700'} mr={1} />
        슬랙 아이디 찾기
      </LinkField>
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
        슬랙 인증하기
      </Button>
    </PageTemplate>
  );
};

export default SettingSlack;
