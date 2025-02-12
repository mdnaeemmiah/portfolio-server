import { z } from "zod";

// Zod schema for creating a new project (all fields are required)
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  image: z.string().url("Invalid image URL"), // Validate that the image is a valid URL
  liveLink: z.string().url("Invalid live link URL"), // Validate the live link as a URL
});

// Zod schema for updating an existing project (fields are optional)
export const updateProjectSchema = projectSchema.partial(); // Making all fields optional for updates
