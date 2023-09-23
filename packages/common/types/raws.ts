export interface UserResponse {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: PostResponse[] | string[];
  likes: LikeResponse[];
  comments: string[];
  followers: [];
  following: [
    {
      _id: '6169e91316cb2265df003c6d';
      user: '6169e58216cb2265df003bf4';
      follower: '6169e206aa57d952c6dc1edd';
      createdAt: '2021-10-15T20:48:19.816Z';
      updatedAt: '2021-10-15T20:48:19.816Z';
      __v: 0;
    }
  ];
  notifications: NotificationResponse[];
  messages: MessageResponse[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelResponse {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  author: UserResponse;
  comments: CommentResponse[];
}

export interface PostResponse {
  likes: LikeResponse[];
  comments: CommentResponse[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelResponse;
  author: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface LikeResponse {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  _id: string;
  comment: string;
  author: UserResponse;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  seen: boolean;
  _id: string;
  author: UserResponse;
  user: UserResponse | string;
  post?: string; // 포스트 id
  follow?: string; // 사용자 id
  comment?: CommentResponse;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

export interface FollowResponse {
  _id: string;
  user: string; // 사용자 id
  follower: string; // 사용자 id
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  _id: string[];
  message: string;
  sender: UserResponse;
  receiver: UserResponse;
  seen: boolean;
  createdAt: string;
}

export interface MessageResponse {
  _id: string;
  message: string;
  sender: UserResponse;
  receiver: UserResponse;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
