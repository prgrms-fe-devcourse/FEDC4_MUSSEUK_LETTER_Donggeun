// 여기에서 zod로 validation 한다.
import { z } from 'zod';
import { type Validator } from '@/utils/validator';

const authValidator: Validator = {
  signup: {
    body: z.object({
      username: z
        .string({
          required_error: '아이디를 입력해주세요.'
        })
        .min(1, '아이디를 입력해주세요.')
        .max(6, '최대 6글자'),
      password: z
        .string({
          required_error: '비밀번호를 입력해주세요.'
        })
        .min(1, '비밀번호를 입력해주세요.')
        .max(6, '최대 6글자')
    })
  }
};

export default authValidator;
