import z from "zod";


export const messageSchema = z.object({
       content: z
        .string()
        .min(10, { message: "must be at least 10 charater" })
        .max(300, "no more then 300 charater"),
})