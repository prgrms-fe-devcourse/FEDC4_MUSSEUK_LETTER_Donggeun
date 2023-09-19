import PageTemplateWithHeader from '@/components/WhiteCard/PageTemplateWithHeader';
import { Image, Heading, Button, FormControl, RadioGroup, Radio, VStack, Text, Stack } from '@chakra-ui/react';
import musseuk_slack from '@/assets/images/musseuk_slack.png';
import InputField from '@/pages/Signup/components/InputField';
import { QuestionIcon } from '@chakra-ui/icons';
import useGenerateSlackLinkMutation from '@/apis/mutations/useGenerateSlackLinkMutation';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import LinkField from './components/LinkField';
import { z } from 'zod';
import { SLACK_WORKSPACE } from '@/constants/slack';

const formSchema = z.object({
  slackId: z.string(),
  slackWorkspace: z.enum(SLACK_WORKSPACE)
});

type FormValues = z.infer<typeof formSchema>;

const SettingSlack = () => {
  const { mutate } = useGenerateSlackLinkMutation();
  const notionURL = import.meta.env.VITE_SLACK_ID_DESCRIPTION;

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(
      { slackId: data.slackId, slackWorkspace: data.slackWorkspace },
      {
        onSuccess: (res) => console.log(res)
      }
    );
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => console.error(errors);

  return (
    <PageTemplateWithHeader onSubmit={handleSubmit(onSubmit, onError)}>
      <Image maxW="32" src={musseuk_slack} alt="머쓱이" />
      <Heading fontSize={'3xl'} textAlign="center" wordBreak={'keep-all'}>
        슬랙 인증을 통해 편지 알림을 슬랙으로 받아보세요
      </Heading>
      <FormControl>
        <Controller
          defaultValue="Frontend"
          name="slackWorkspace"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} display={'flex'} w={'100%'} gap={2} my={8}>
              <VStack gap={2} w={'100%'} alignItems={'start'}>
                <Text fontWeight={'bold'}>데브코스</Text>
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="primary" borderColor={'gray.200'} value="Frontend">
                    프론트엔드
                  </Radio>
                  <Radio colorScheme="primary" borderColor={'gray.200'} value="Backend" isDisabled>
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
        error={errors.slackId}
      />
      <LinkField title="노션 페이지로 이동" href={notionURL}>
        <QuestionIcon color={'primary.700'} mr={1} />
        슬랙 아이디 찾기
      </LinkField>
      <Button type="submit" mt="6" w="100%" colorScheme="primary">
        슬랙 인증하기
      </Button>
    </PageTemplateWithHeader>
  );
};

export default SettingSlack;
