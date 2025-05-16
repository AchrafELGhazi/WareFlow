import { z, string, object } from 'zod';

export const getUserInfoSchema = object({
  params: object({
    userId: string({
      required_error: 'User ID is Required'
    })
    .uuid('Invalid User ID format')
  })
})

export type SignupInput = z.infer<typeof getUserInfoSchema>;
