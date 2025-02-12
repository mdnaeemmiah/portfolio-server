import express from "express";
import { blogPostController } from "./blog.controller";

const blogRoute = express.Router();

// Create a new blog post
blogRoute.post("/create", blogPostController.createBlogPost);

// Get all blog posts
blogRoute.get("/", blogPostController.getAllBlogPosts);

// Get a single blog post by ID
blogRoute.get("/:id", blogPostController.getBlogPostById);

// Update a blog post
blogRoute.put("/update/:id", blogPostController.updateBlogPost);

// Delete a blog post
blogRoute.delete("/delete/:id", blogPostController.deleteBlogPost);

export default blogRoute;
