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
        .max(20, '아이디는 최대 20글자까지만 입력할 수 있습니다.'),
      password: z
        .string({
          required_error: '비밀번호를 입력해주세요.'
        })
        .min(8, '8글자 이상으로만 입력할 수 있습니다.')
        .refine((value) => /\d/.test(value), '숫자를 반드시 포함해야 합니다.'),
      name: z
        .string({
          required_error: '실명을 입력해주세요.'
        })
        .min(2, '실명을 최소 2글자 이상으로만 입력할 수 있습니다.')
        .max(4, '실명은 최대 4글자까지만 입력할 수 있습니다.')
    })
  }
};

export default authValidator;
