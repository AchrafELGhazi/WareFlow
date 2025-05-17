import { z, string, object } from 'zod';

export const getUserInfoSchema = object({
  params: object({
    userId: string({
      required_error: 'User ID is Required'
    })
    .uuid('Invalid User ID format')
  })
})


export const getAllUsersSchema = object({
  // query: object({
  //   page: string()
  //     .optional()
  //     .transform(val => (val ? parseInt(val) : 1)),
  //   limit: string()
  //     .optional()
  //     .transform(val => (val ? parseInt(val) : 25)),
  //   role: string().optional(),
  //   isActive: string()
  //     .optional()
  //     .transform(val => val === 'true'),
  //   search: string().optional(),
  // }),
});

export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>;
export type SignupInput = z.infer<typeof getUserInfoSchema>;
