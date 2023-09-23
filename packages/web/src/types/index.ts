import { DECORATION_IMAGE_NAME, MUSSEUK_IMAGE_NAME } from '@common/constants/imageNames';
import { SLACK_WORKSPACE } from '@common/constants/slack';

export interface User extends UserFullName {
  _id: string;
  email: string;
  image: string; // default: 기본 이미지
  postCount: number; // 총 포스트 개수
  commentCount: number; // 본인이 작성한 총 댓글 개수
}

export interface UserFullName {
  username: string; // 사용자 실명
  introduce: string; // default: "안녕하세요 000입니다"
  slackId?: string; // default: undefined
  slackWorkspace?: SlackWorkspace; // default: undefined
}

export interface Post extends PostTitle {
  _id: string;
  comments: Comment[];
  author: User;
}

export interface PostTitle {
  title: string; // 머쓱이 제목, default: "머쓱이"
  content: string; // 소개글, default: ""
  musseukImageName: MusseukType; // 머쓱이 이미지 파일 이름, default: "musseuk_default"
}

export type MusseukType = (typeof MUSSEUK_IMAGE_NAME)[keyof typeof MUSSEUK_IMAGE_NAME];

export interface Comment extends CommentField {
  _id: string;
  author: User;
}

export interface CommentField {
  content: string; // default: ""
  position: [number, number]; // 댓글 좌표(백분율), default: [0, 0]
  nickname: string; // default: "익명의 머쓱이"
  decorationImageName: DecorationType; // 장식 이미지 파일 이름, default: "decoration_soju1"
}

export type DecorationType = (typeof DECORATION_IMAGE_NAME)[keyof typeof DECORATION_IMAGE_NAME];

export type SlackWorkspace = (typeof SLACK_WORKSPACE)[keyof typeof SLACK_WORKSPACE];
