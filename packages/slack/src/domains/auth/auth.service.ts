import jwt from 'jsonwebtoken';
import UserRepository from '@/domains/users/users.repository';
import { ResponseError, ValidationError } from '@/utils/ResponseError';
import { makeRandomString, encryptText } from '@/utils/crypto';

const authService = {
  async signUp(username: string, password: string, name: string) {
    if (await UserRepository.findOneBy({ username })) {
      throw new ResponseError(409, '이미 존재하는 회원입니다.');
    }

    const salt = makeRandomString(64);
    const encryptedPassword = encryptText(password, salt);

    await UserRepository.insert({
      name,
      username,
      password: encryptedPassword,
      salt: salt
    });

    const insertedUser = await UserRepository.findUserByUsername({ username });

    if (!insertedUser) {
      throw new ResponseError(500, '회원가입에 실패했습니다.');
    }

    const accessToken = authService.generateAccessToken(insertedUser.id, insertedUser.username, insertedUser.role);

    return {
      userId: insertedUser.id,
      accessToken
    };
  },

  async signIn(username: string, password: string) {
    const user = await UserRepository.findOneBy({ username });

    if (!user) {
      throw new ValidationError({
        username: '존재하지 않는 회원입니다.'
      });
    }

    const encryptedPassword = encryptText(password, user.salt);

    if (user.password !== encryptedPassword) {
      throw new ValidationError({
        password: '비밀번호가 일치하지 않습니다.'
      });
    }

    const accessToken = authService.generateAccessToken(user.id, user.username, user.role);

    return {
      userId: user.id,
      accessToken
    };
  },

  async signCheck(userId: number) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new ResponseError(404, '사용자를 찾을 수 없어요.');
    }

    return {
      userId: user.id
    };
  },

  generateAccessToken(id: number, username: string, role: string) {
    const accessToken = jwt.sign({ id, username, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return accessToken;
  }
};

export default authService;
