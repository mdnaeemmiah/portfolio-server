import { z } from "zod";

export const messageSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  
  email: z.string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  
  subject: z.string()
    .min(5, "Subject must be at least 5 characters long")
    .max(100, "Subject cannot exceed 100 characters")
    .trim(),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message cannot exceed 500 characters")
    .trim(),
});
