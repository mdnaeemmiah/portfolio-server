import { BlogPostModel } from "./blog.model";


// Fetch all blog posts
const getAllBlogPosts = async () => {
  const result = await BlogPostModel.find();
  return result;
};

// Fetch a single blog post by ID
const getSingleBlogPost = async (id: string) => {
  const result = await BlogPostModel.findById(id);
  return result;
};

// Create a new blog post
const createBlogPost = async (data:BlogPost) => {
  const result = await BlogPostModel.create(data);
  return result;
};

// Update a blog post
const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
  const result = await BlogPostModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete a blog post
const deleteBlogPost = async (id: string) => {
  const result = await BlogPostModel.findByIdAndDelete(id);
  return result;
};

export const blogPostService = {
  getAllBlogPosts,
  getSingleBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
