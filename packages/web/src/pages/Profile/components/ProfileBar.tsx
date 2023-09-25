import {
  HStack,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Grid,
  GridItem,
  Square
} from '@chakra-ui/react';
import { BiEnvelope } from 'react-icons/bi';
import { MdComment } from 'react-icons/md';
import defaultProfile from '@/assets/images/musseuk_hood.png';
import { useState, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUpdateUserMutation from '@/apis/mutations/useUpdateUserMutation';
import useProfileImageMutation from '@/apis/mutations/useProfileImageMutation';
import useUserInfoQuery from '@/apis/queries/useUserInfoQuery';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';

interface ProfileProps {
  userId: string;
}

interface FormData {
  username: string;
  introduce: string;
}

const ProfileBar = ({ userId }: ProfileProps) => {
  const { data: user } = useUserInfoQuery(userId);
  const { data: authUser } = useAuthCheckQuery({ suspense: true });
  const isMyProfile = user?._id === authUser?._id;

  const { mutate: putUser } = useUpdateUserMutation();
  const { mutate: postPhoto } = useProfileImageMutation();

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditImage, setIsEditImage] = useState(false);
  const [imgFile, setImgFile] = useState(user?.image);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit } = useForm<FormData>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsEditProfile(!isEditProfile);
    putUser(
      {
        username: data.username,
        introduce: data.introduce,
        slackId: user?.slackId,
        slackWorkspace: user?.slackWorkspace
      },
      {
        onSuccess: () => {
          setIsEditProfile(!isEditProfile);
        }
      }
    );
  };

  const onClickImgBtn = () => {
    setIsEditImage(!isEditImage);
    fileInput.current?.click();
    setIsEditImage(!isEditImage);
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList = e.target.files!;
    if (files?.length === 0) {
      setIsEditImage(!isEditImage);
      return toast({
        title: '프로필 변경 취소',
        description: '프로필이 변경이 취소되었습니다.',
        position: 'top',
        isClosable: true
      });
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImgFile(reader.result as string);
    };
    postPhoto(
      { isCover: false, image: files[0] },
      {
        onSuccess: () => {
          setIsEditImage(!isEditImage);
          return toast({
            title: '프로필 변경 완료',
            status: 'success',
            description: '프로필이 변경되었습니다.',
            position: 'top',
            colorScheme: 'primary'
          });
        },
        onError: () => {
          toast({
            title: '프로필 변경 취소',
            status: 'error',
            description: '프로필이 변경이 취소되었습니다.',
            position: 'top',
            isClosable: true
          });
        }
      }
    );
  };

  return (
    <Grid
      h={'100%'}
      pt={4}
      px={{ base: 0, md: 6 }}
      borderRight={{ md: '2px solid #B6B6B6' }}
      templateAreas={{ base: `"profile edit"`, md: `"profile" "edit"` }}
      gridTemplateColumns={{ base: '1fr 3.5fr', md: '1fr' }}
      gridTemplateRows={{ base: '1fr', md: '1fr 3.5fr' }}>
      <GridItem gridArea={'profile'} textAlign="center">
        <Square m={2}>
          <Avatar size={'2xl'} src={imgFile ?? user?.image ?? defaultProfile} rounded={'full'} />
        </Square>
        <Input type="file" accept="image/*" hidden onChange={onImgChange} ref={fileInput} />
        {isMyProfile && (
          <Button isLoading={isEditImage} colorScheme="primary" onClick={onClickImgBtn}>
            이미지변경
          </Button>
        )}
        {isEditImage && <Button onClick={() => setIsEditImage(!isEditImage)}>프로필삭제</Button>}
      </GridItem>

      <GridItem area={'edit'} textAlign="center">
        <Input
          type="text"
          placeholder={isEditProfile ? '실명을 작성해주세요' : ''}
          defaultValue={user?.username}
          {...register('username')}
          border={`${isEditProfile ? 'solid' : 'none'}`}
          borderColor={'green01'}
          textAlign={'center'}
          isReadOnly={!isEditProfile}
          isRequired={true}
          my={2}
        />
        <FormControl>
          <HStack my={4} align={'center'}>
            <FormLabel mx={0} fontSize={'1.2rem'} p={2}>
              <BiEnvelope />
            </FormLabel>
            <Input type="email" value={user?.email ?? ''} h={6} border={'none'} isReadOnly={true} />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack my={4} align="flex-start">
            <FormLabel mx={0} fontSize={'1.2rem'} p={2}>
              <MdComment />
            </FormLabel>
            <Textarea
              placeholder={isEditProfile ? '자기소개를 작성해주세요' : ''}
              resize="none"
              {...register('introduce')}
              defaultValue={user?.introduce}
              isReadOnly={!isEditProfile}
              border={`${isEditProfile ? 'solid' : 'none'}`}
              borderColor={'green01'}
              maxLength={80}
            />
          </HStack>
        </FormControl>
        {isMyProfile && (
          <Button type="submit" colorScheme="primary" onClick={handleSubmit(onSubmit)}>
            {isEditProfile ? '프로필편집완료' : '프로필편집하기'}
          </Button>
        )}
      </GridItem>
    </Grid>
  );
};

export default ProfileBar;
