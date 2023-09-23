import { VStack, HStack, Avatar, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
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

  const onClickImageBtn = () => {
    //btn name 이 이미지 변경 (isEditImage === false)
    if (!isEditImage) {
      setIsEditImage(!isEditImage); //이미지변경 -> 프로필 업로드
      fileInput.current?.click();
      setIsEditImage(!isEditImage);
    }
    //btn name 이 이미지 업로드 (isEditImage === true )
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
          // console.log('성공');
          return toast({
            title: '프로필 변경 완료',
            description: '프로필이 변경되었습니다.',
            position: 'top',
            colorScheme: 'primary'
          });
        },
        onError: () => {
          console.log('error');
          toast({
            title: '프로필 변경 취소',
            description: '프로필이 변경이 취소되었습니다.',
            position: 'top',
            isClosable: true
          });
        }
      }
    );
  };

  return (
    <VStack h={'100%'} pt={4} px={6} borderRight="1px solid #B6B6B6">
      {/* 이미지업로드 */}
      <VStack py={4}>
        <Avatar size={'2xl'} src={imgFile ?? user?.image ?? defaultProfile} rounded={'full'} />
        <Input
          type="file"
          accept="image/*"
          hidden
          onChange={onImgChange}
          ref={fileInput}
          onInput={(e) => {
            console.log(e);
          }}
        />
        {isMyProfile && (
          <HStack>
            {isEditImage ? (
              <Button
                h={8}
                isLoading
                loadingText="Loading"
                colorScheme="primary"
                variant="outline"
                spinnerPlacement="start"></Button>
            ) : (
              <Button h={8} colorScheme="primary" onClick={onClickImageBtn}>
                이미지변경
              </Button>
            )}
            {isEditImage && <Button onClick={() => setIsEditImage(!isEditImage)}>프로필삭제</Button>}
          </HStack>
        )}
      </VStack>
      {/* 사용자 정보 변경 */}
      <VStack>
        <Input
          type="text"
          placeholder={isEditProfile ? '실명을 작성해주세요' : ''}
          defaultValue={user?.username}
          {...register('username')}
          border={`${isEditProfile ? 'solid' : 'none'}`}
          textAlign={'center'}
          isReadOnly={!isEditProfile}
          isInvalid={true}
        />
        <FormControl>
          <HStack my={4} justify={'center'} align={'center'}>
            <FormLabel my={0} fontSize={'1.2rem'}>
              <BiEnvelope />
            </FormLabel>
            <Input type="email" value={user?.email ?? ''} h={6} border={'none'} isReadOnly={true} />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack my={4} justify={'center'} align={'center'}>
            <FormLabel my={0} fontSize={'1.2rem'}>
              <MdComment />
            </FormLabel>
            <Textarea
              placeholder={isEditProfile ? '자기소개를 작성해주세요' : ''}
              h={6}
              resize="none"
              {...register('introduce')}
              defaultValue={user?.introduce}
              isReadOnly={!isEditProfile}
              border={`${isEditProfile ? 'solid' : 'none'}`}
            />
          </HStack>
        </FormControl>
        {isMyProfile && (
          <Button type="submit" colorScheme="primary" onClick={handleSubmit(onSubmit)}>
            {isEditProfile ? '프로필편집완료' : '프로필편집하기'}
          </Button>
        )}
      </VStack>
    </VStack>
  );
};

export default ProfileBar;
