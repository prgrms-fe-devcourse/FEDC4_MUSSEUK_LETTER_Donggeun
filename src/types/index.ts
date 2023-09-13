export interface User {
  _id: string;
  email: string;
  username: string; // 사용자 실명
  nickname: string;
  introduce: string;
  image: string;
}

export interface customUserFullName {
  username: string;
  nickname: string;
  introduce: string;
}

export interface Post extends customPostTitle {
  _id: string;
  comments: Comment[];
  author: User;
}

export interface customPostTitle {
  title: string;
  content: string;
  musseukId: string;
}

export interface Comment extends customCommentComment {
  _id: string;
}

export interface customCommentComment {
  content: string;
  pos: [number, number];
  nickname: string;
}
