import { z } from 'zod';

const postValidator = {
  list: z.object({}),
  create: z.object({}),
  detail: z.object({}),
  update: z.object({}),
  delete: z.object({}),
  comments: z.object({}),
  createComment: z.object({})
} as const;

export default postValidator;
