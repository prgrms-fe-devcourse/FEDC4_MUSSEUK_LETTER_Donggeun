/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * Musseuk
 * Musseuk Letter API Docs
 * OpenAPI spec version: 1.0.0
 */
import * as axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  Comment,
  GetAuthCheck200,
  GetPostsParams,
  GetUsersParams,
  PostAuthSignin200,
  PostAuthSigninBody,
  PostAuthSignout200,
  PostAuthSignup201,
  PostAuthSignupBody,
  PostDetail,
  PostList,
  PostPosts201,
  PostPostsBody,
  PostPostsPostIdCommentsBody,
  PostPostsPostIdCommentsParams,
  PostSlackVerificationBody,
  PutAuthPassword200,
  PutAuthPasswordBody,
  PutPostsPostIdBody,
  PutUsersUserIdBody,
  PutUsersUserIdSlackBody,
  User
} from './orval.schemas';

/**
 * 회원가입을 합니다.
 * @summary 회원가입
 */
export const postAuthSignup = <TData = AxiosResponse<PostAuthSignup201>>(
  postAuthSignupBody: PostAuthSignupBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/signup`, postAuthSignupBody, options);
};

/**
 * 로그인을 합니다.
 * @summary 로그인
 */
export const postAuthSignin = <TData = AxiosResponse<PostAuthSignin200>>(
  postAuthSigninBody: PostAuthSigninBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/signin`, postAuthSigninBody, options);
};

/**
 * 로그아웃 합니다.
 * @summary 로그아웃
 */
export const postAuthSignout = <TData = AxiosResponse<PostAuthSignout200>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/signout`, undefined, options);
};

/**
 * 로그인이 되어있는지 확인합니다.
 * @summary 로그인 확인
 */
export const getAuthCheck = <TData = AxiosResponse<GetAuthCheck200>>(options?: AxiosRequestConfig): Promise<TData> => {
  return axios.default.get(`/auth/check`, options);
};

/**
 * 비밀번호를 변경합니다.
 * @summary 비밀번호 변경
 */
export const putAuthPassword = <TData = AxiosResponse<PutAuthPassword200>>(
  putAuthPasswordBody: PutAuthPasswordBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(`/auth/password`, putAuthPasswordBody, options);
};

/**
 * 사용자 목록을 조회합니다.
 * @summary 사용자 목록 조회
 */
export const getUsers = <TData = AxiosResponse<User[]>>(
  params?: GetUsersParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/users`, {
    ...options,
    params: { ...params, ...options?.params }
  });
};

/**
 * 특정 사용자의 정보를 조회합니다.
 * @summary 특정 사용자의 정보 조회
 */
export const getUsersUserId = <TData = AxiosResponse<User>>(
  userId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/users/${userId}`, options);
};

/**
 * 사용자의 정보를 수정합니다.
 * @summary 사용자의 정보 수정
 */
export const putUsersUserId = <TData = AxiosResponse<User>>(
  userId: number,
  putUsersUserIdBody: PutUsersUserIdBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(`/users/${userId}`, putUsersUserIdBody, options);
};

/**
 * 사용자의 프로필 이미지 수정를 수정합니다.
 * @summary 사용자의 프로필 이미지 수정 (TODO- 작업이 필요함)
 */
export const putUsersUserIdPhoto = <TData = AxiosResponse<void>>(
  userId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(`/users/${userId}/photo`, undefined, options);
};

/**
 * 사용자의 슬랙 연동 계정을 수정합니다.
 * @summary 사용자의 슬랙 연동 계정 수정
 */
export const putUsersUserIdSlack = <TData = AxiosResponse<void>>(
  userId: number,
  putUsersUserIdSlackBody: PutUsersUserIdSlackBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(`/users/${userId}/slack`, putUsersUserIdSlackBody, options);
};

/**
 * 슬랙 DM으로 인증 링크를 전송합니다.
 * @summary 슬랙 DM으로 인증 링크 전송
 */
export const postSlackVerification = <TData = AxiosResponse<void>>(
  postSlackVerificationBody: PostSlackVerificationBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/slack/verification`, postSlackVerificationBody, options);
};

/**
 * 머쓱이 목록을 조회합니다.
 * @summary 머쓱이 목록 조회
 */
export const getPosts = <TData = AxiosResponse<PostList>>(
  params?: GetPostsParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/posts`, {
    ...options,
    params: { ...params, ...options?.params }
  });
};

/**
 * 머쓱이를 생성합니다.
 * @summary 머쓱이 생성
 */
export const postPosts = <TData = AxiosResponse<PostPosts201>>(
  postPostsBody: PostPostsBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/posts`, postPostsBody, options);
};

/**
 * 머쓱이의 상세 정보를 조회합니다.
 * @summary 머쓱이 상세 조회
 */
export const getPostsPostId = <TData = AxiosResponse<PostDetail>>(
  postId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/posts/${postId}`, options);
};

/**
 * 머쓱이를 수정합니다.
 * @summary 머쓱이 수정 (없어도 되나?)
 */
export const putPostsPostId = <TData = AxiosResponse<void>>(
  postId: number,
  putPostsPostIdBody: PutPostsPostIdBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(`/posts/${postId}`, putPostsPostIdBody, options);
};

/**
 * 머쓱이를 삭제합니다.
 * @summary 머쓱이 삭제
 */
export const deletePostsPostId = <TData = AxiosResponse<void>>(
  postId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.delete(`/posts/${postId}`, options);
};

/**
 * 특정 머쓱이의 편지 목록 조회을 조회합니다.
 * @summary 특정 머쓱이의 편지 목록 조회
 */
export const getPostsPostIdComments = <TData = AxiosResponse<Comment[]>>(
  postId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/posts/${postId}/comments`, options);
};

/**
 * 특정 머쓱이에게 편지를 작성합니다.
 * @summary 특정 머쓱이에게 편지 작성
 */
export const postPostsPostIdComments = <TData = AxiosResponse<Comment>>(
  postId: number,
  postPostsPostIdCommentsBody: PostPostsPostIdCommentsBody,
  params?: PostPostsPostIdCommentsParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/posts/${postId}/comments`, postPostsPostIdCommentsBody, {
    ...options,
    params: { ...params, ...options?.params }
  });
};

/**
 * 특정 편지의 상세 정보를 조회합니다.
 * @summary 편지 상세 조회
 */
export const getCommentsCommentId = <TData = AxiosResponse<Comment>>(
  commentId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/comments/${commentId}`, options);
};

/**
 * 특정 편지를 삭제합니다.
 * @summary 편지 삭제
 */
export const deleteCommentsCommentId = <TData = AxiosResponse<void>>(
  commentId: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.delete(`/comments/${commentId}`, options);
};

export type PostAuthSignupResult = AxiosResponse<PostAuthSignup201>;
export type PostAuthSigninResult = AxiosResponse<PostAuthSignin200>;
export type PostAuthSignoutResult = AxiosResponse<PostAuthSignout200>;
export type GetAuthCheckResult = AxiosResponse<GetAuthCheck200>;
export type PutAuthPasswordResult = AxiosResponse<PutAuthPassword200>;
export type GetUsersResult = AxiosResponse<User[]>;
export type GetUsersUserIdResult = AxiosResponse<User>;
export type PutUsersUserIdResult = AxiosResponse<User>;
export type PutUsersUserIdPhotoResult = AxiosResponse<void>;
export type PutUsersUserIdSlackResult = AxiosResponse<void>;
export type PostSlackVerificationResult = AxiosResponse<void>;
export type GetPostsResult = AxiosResponse<PostList>;
export type PostPostsResult = AxiosResponse<PostPosts201>;
export type GetPostsPostIdResult = AxiosResponse<PostDetail>;
export type PutPostsPostIdResult = AxiosResponse<void>;
export type DeletePostsPostIdResult = AxiosResponse<void>;
export type GetPostsPostIdCommentsResult = AxiosResponse<Comment[]>;
export type PostPostsPostIdCommentsResult = AxiosResponse<Comment>;
export type GetCommentsCommentIdResult = AxiosResponse<Comment>;
export type DeleteCommentsCommentIdResult = AxiosResponse<void>;
