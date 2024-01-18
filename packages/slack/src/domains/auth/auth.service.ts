import jwt from 'jsonwebtoken';
import UserRepository from '@/domains/users/users.repository';
import { ResponseError, ValidationError } from '@/utils/ResponseError';
import { makeRandomString, encryptText } from '@/utils/crypto';

const authService = {
  async signUp(email: string, password: string, name: string) {
    if (await UserRepository.findOneBy({ email })) {
      throw new ResponseError(409, '이미 존재하는 회원입니다.');
    }

    const salt = makeRandomString(64);
    const encryptedPassword = encryptText(password, salt);

    await UserRepository.insert({
      name,
      email,
      password: encryptedPassword,
      salt: salt
    });

    const insertedUser = await UserRepository.findUserByEmail({ email });

    if (!insertedUser) {
      throw new ResponseError(500, '회원가입에 실패했습니다.');
    }

    const accessToken = authService.generateAccessToken(insertedUser.userId, insertedUser.email, insertedUser.role);

    return {
      userId: insertedUser.userId,
      accessToken
    };
  },

  async signIn(email: string, password: string) {
    const user = await UserRepository.findOneBy({ email });

    if (!user) {
      throw new ResponseError(400, '일치하는 회원이 없어요.');
    }

    const encryptedPassword = encryptText(password, user.salt);

    if (user.password !== encryptedPassword) {
      throw new ResponseError(400, '일치하는 회원이 없어요.');
    }

    const accessToken = authService.generateAccessToken(user.userId, user.email, user.role);

    return {
      userId: user.userId,
      accessToken
    };
  },

  async signCheck(userId: number) {
    const user = await UserRepository.findOneBy({ userId });

    if (!user) {
      throw new ResponseError(500, '사용자를 찾을 수 없어요.');
    }

    return {
      userId: user.userId
    };
  },

  async changePassword(userId: number, password: string) {
    const user = await UserRepository.findOneBy({ userId });

    if (!user) {
      throw new ResponseError(500, '사용자를 찾을 수 없어요.');
    }

    const salt = makeRandomString(64);
    const encryptedPassword = encryptText(password, salt);

    await UserRepository.update(user.userId, {
      password: encryptedPassword,
      salt: salt
    });
  },

  generateAccessToken(id: number, email: string, role: string) {
    const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return accessToken;
  }
};

export default authService;
