import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    font: z.enum(["serif", "sans"]),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    font: z.enum(["serif", "sans"]).optional().default("serif"),
  }),
});

export const collections = { posts, pages };
