import z from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SigninInput = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SignupInput = z.infer<typeof signinSchema>;
export declare const createBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export type CreateBlogInput = z.infer<typeof createBlog>;
export declare const updateBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, z.z.core.$strip>;
export type UpdateBlogInput = z.infer<typeof updateBlog>;
//# sourceMappingURL=index.d.ts.map