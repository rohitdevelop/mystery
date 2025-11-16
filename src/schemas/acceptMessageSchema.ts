import z from "zod";


export const acceptmessageSchema = z.object({
    messageaccept: z.boolean(),
})