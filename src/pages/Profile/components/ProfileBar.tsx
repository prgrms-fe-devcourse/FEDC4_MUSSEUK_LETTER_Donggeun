import { VStack, HStack, Avatar, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { BiEnvelope } from 'react-icons/bi';
import { MdComment, MdOutlineInsertChartOutlined } from 'react-icons/md';
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
          // console.log(user);
        },
        onError: (error) => {
          console.log(error);
        }
      }
    );
  };

  const onClickImageBtn = () => {
    //btn name 이 이미지 변경 (isEditImage === false)
    if (!isEditImage) {
      setIsEditImage(!isEditImage);
      fileInput.current?.click();
    }
    //btn name 이 이미지 업로드 (isEditImage === true )
    setIsEditImage(!isEditImage);
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImgFile(reader.result as string);
    };
    postPhoto({ isCover: false, image: files[0] });
  };

  return (
    <VStack h={'100%'} my={10} pt={4} px={6} borderRight="1px solid #B6B6B6">
      {/* 이미지업로드 */}
      <VStack py={4}>
        <Avatar size={'2xl'} src={imgFile ?? user?.image} rounded={'full'} />
        <Input type="file" hidden accept="image/*" onChange={onImgChange} ref={fileInput} />
        {isMyProfile && (
          <Button h={8} colorScheme="primary" onClick={onClickImageBtn}>
            {isEditImage ? '이미지업로드' : '이미지변경'}
          </Button>
        )}
      </VStack>
      {/* 사용자 정보 변경 */}
      <VStack>
        <Input
          type="text"
          placeholder={'이름을 작성해주세요'}
          defaultValue={user?.username}
          {...register('username')}
          border={'none'}
          textAlign={'center'}
          isReadOnly={!isEditProfile}
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
              placeholder="자기소개를 작성해주세요"
              h={6}
              {...register('introduce')}
              defaultValue={user?.introduce}
              isReadOnly={!isEditProfile}
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
