import z from "zod";

export const chatSchema = z.object({
    message: z.string(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional()
})

export type ChatInput = z.infer<typeof chatSchema>