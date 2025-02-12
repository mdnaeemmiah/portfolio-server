import mongoose, { Schema } from "mongoose";


// Define the Mongoose Schema
const BlogPostSchema = new Schema<BlogPost>(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
    },
    { timestamps: true } 
  );
  
 
  export const BlogPostModel = mongoose.model<BlogPost>('BlogPostModel', BlogPostSchema);

