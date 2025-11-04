import { z } from 'zod';

const passwordRegex = new RegExp(
  '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]).{8,}$',
);

export const signInSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(passwordRegex, {
        message:
          'Password must contain at least one letter, one number, and one special character',
      }),
  })
  .required();

export type SigninDto = z.infer<typeof signInSchema>;
