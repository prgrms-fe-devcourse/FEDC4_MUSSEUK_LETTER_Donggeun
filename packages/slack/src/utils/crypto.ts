import crypto from 'crypto';

/**
 * length 길이의 랜덤 문자열을 생성합니다.
 */
export const makeRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};

/**
 * 평문을 암호화 합니다.
 * @param plainText 암호화 할 평문
 * @param salt 시크릿 키
 * @returns string
 */
export const encryptText = (plainText: string, salt: string) => {
  return crypto.pbkdf2Sync(plainText, salt, 51234, 32, 'sha512').toString('hex');
};
