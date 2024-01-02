import { z } from 'zod';

const authValidator = {
  signup: {
    body: z.object({
      email: z
        .string({
          required_error: '이메일을 입력해주세요.'
        })
        .email({
          message: '이메일 형식이 아닙니다.'
        }),
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
  },
  signin: {
    body: z.object({
      email: z
        .string({
          required_error: '이메일을 입력해주세요.'
        })
        .email({
          message: '이메일 형식이 아닙니다.'
        }),
      password: z.string({
        required_error: '비밀번호를 입력해주세요.'
      })
    })
  },
  password: {
    body: z.object({
      password: z
        .string({
          required_error: '비밀번호를 입력해주세요.'
        })
        .min(8, '8글자 이상으로만 입력할 수 있습니다.')
        .refine((value) => /\d/.test(value), '숫자를 반드시 포함해야 합니다.')
    })
  }
} as const;

export default authValidator;
