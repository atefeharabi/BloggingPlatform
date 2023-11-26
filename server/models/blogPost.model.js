
import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  content: {
    type: String,
    required: 'Content is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model('BlogPost', BlogPostSchema);
