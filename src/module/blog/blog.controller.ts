import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { blogPostSchema, updateBlogPostSchema } from "./blog.validation";
import { blogPostService } from "./blog.service";
import { BlogPostModel } from "./blog.model";
// Create a new blog post
const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  const validatedData = blogPostSchema.parse(req.body);
  const newPost = await blogPostService.createBlogPost(validatedData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Blog post created successfully!",
    data: newPost,
  });
});

// Get all blog posts
const getAllBlogPosts = catchAsync(async (_req: Request, res: Response) => {
  const posts = await blogPostService.getAllBlogPosts();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog posts retrieved successfully",
    data: posts,
  });
});

// Get a single blog post by ID
const getBlogPostById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid blog post ID");
  }

  const post = await blogPostService.getSingleBlogPost(id);

  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog post not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog post retrieved successfully",
    data: post,
  });
});

// Update a blog post
const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid blog post ID");
  }

  const validatedData = updateBlogPostSchema.parse(req.body);
  const updatedPost = await blogPostService.updateBlogPost(id, validatedData);

  if (!updatedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog post not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog post updated successfully",
    data: updatedPost,
  });
});

// Delete a blog post
const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid blog post ID");
  }

  const deletedPost = await BlogPostModel.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog post not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog post deleted successfully",
    data: deletedPost,
  });
});

export const blogPostController = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
