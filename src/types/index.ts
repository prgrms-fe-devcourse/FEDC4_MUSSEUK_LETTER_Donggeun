export interface User extends UserFullName {
  _id: string;
  email: string;
  image: string; // default: 기본 이미지
  posts: string[]; // 포스트 id 목록
  comments: string[]; // 댓글 id 목록
}

export interface UserFullName {
  username: string; // 사용자 실명
  introduce: string; // default: "안녕하세요 000입니다"
  slackId?: string; // default: undefined
  slackWorkspace?: 'Frontend' | 'Backend'; // default: undefined
}

export interface Post extends PostTitle {
  _id: string;
  comments: Comment[];
  author: User;
}

export interface PostTitle {
  title: string; // 머쓱이 제목, default: "머쓱이"
  content: string; // 소개글, default: ""
  musseukImageName: string; // 머쓱이 이미지 파일 이름
}

export interface Comment extends CommentField {
  _id: string;
}

export interface CommentField {
  content: string; // default: ""
  pos: [number, number]; // 댓글 좌표(백분율), default: [0, 0]
  nickname: string; // default: "익명의 머쓱이"
  decorationImageName: string; // 장식 이미지 파일 이름, default: ""
}
