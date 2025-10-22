import { z } from "zod";
export const signupSchema = z.object({
    username: z.string(),
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Minimum 8 Character should have "),
});
export const signinSchema = z.object({
    email: z.string(),
    password: z.string().min(8, "Minimum 8 Character should have "),
});
export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
});
//# sourceMappingURL=index.js.map