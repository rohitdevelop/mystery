import z from "zod";

 
export const signInSchema = z.object({
  email: z.string().email({ message: "invailid email" }),
  password: z
    .string()
    .min(6, { message: "must be 6 charater" })
    .max(8, "no more then 8 charater"),
})