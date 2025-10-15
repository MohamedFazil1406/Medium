import z from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.email("Invalid Email"),
  password: z.string().min(8, "Minimum 8 Character should have "),
});

export type SigninInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Minimum 8 Character should have "),
});

export type SignupInput = z.infer<typeof signinSchema>;

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateBlogInput = z.infer<typeof createBlog>;

export const updateBlog = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type UpdateBlogInput = z.infer<typeof updateBlog>;
