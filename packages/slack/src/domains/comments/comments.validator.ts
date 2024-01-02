import { z } from 'zod';

const commentValidator = {
  detail: z.object({})
} as const;

export default commentValidator;
