import { z } from "zod";

export const $postSchema = z.object({
    id: z.number(),
    userId: z.number(),
    title: z.string(),
    body: z.string()
});

export const $posts = z.array($postSchema);