// server/controllers/blogPost.controller.js
import BlogPost from '../models/blogPost.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const blogPost = new BlogPost(req.body);
  try {
    await blogPost.save();
    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let blogPosts = await BlogPost.find().select('title content created updated');
    res.json(blogPosts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const read = async (req, res) => {
  return res.json(req.blogPost);
};

const update = async (req, res) => {
  try {
    let blogPost = req.blogPost;
    blogPost = Object.assign(blogPost, req.body);
    blogPost.updated = Date.now();
    await blogPost.save();
    res.json(blogPost);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res) => {
  try {
    let blogPost = req.blogPost;
    let deletedBlogPost = await blogPost.remove();
    res.json(deletedBlogPost);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const blogPostByID = async (req, res, next, id) => {
  try {
    let blogPost = await BlogPost.findById(id);
    if (!blogPost)
      return res.status('400').json({
        error: "Blog post not found"
      });
    req.blogPost = blogPost;
    next();
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve blog post"
    });
  }
};

export default { create, list, read, update, remove, blogPostByID };
