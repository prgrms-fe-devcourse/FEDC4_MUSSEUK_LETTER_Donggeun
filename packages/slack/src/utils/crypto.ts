import crypto from 'crypto';

/**
 * length 길이의 랜덤 문자열을 생성합니다.
 */
export const makeRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};
