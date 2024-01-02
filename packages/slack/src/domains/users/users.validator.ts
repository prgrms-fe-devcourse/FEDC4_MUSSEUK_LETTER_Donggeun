import { z } from 'zod';

const userValidator = {
  list: z.object({}),
  detail: z.object({}),
  update: z.object({}),
  updatePhoto: z.object({}),
  updateSlack: z.object({})
} as const;

export default userValidator;
