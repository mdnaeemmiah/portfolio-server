import { z } from "zod";

// Schema for creating a new blog post (all fields required)
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
  image: z.string().url("Invalid image URL"),
  category: z.string(),
});

// Schema for updating a blog post (fields are optional)
export const updateBlogPostSchema = blogPostSchema.partial();
