// client/src/BlogPostForm.jsx
import { useState } from 'react'; // Keep this if you're using useState

import PropTypes from 'prop-types';

const BlogPostForm = ({ saveBlogPost, initialData, clear }) => {
  const [blogPost, setBlogPost] = useState(initialData);

  const handleChange = name => event => {
    setBlogPost({ ...blogPost, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    saveBlogPost(blogPost);
    clear();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input type="text" value={blogPost.title || ''} onChange={handleChange('title')} />
      </label>
      <label>
        Content:
        <textarea value={blogPost.content || ''} onChange={handleChange('content')} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

BlogPostForm.propTypes = {
  saveBlogPost: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string
  }),
  clear: PropTypes.func.isRequired
};

BlogPostForm.defaultProps = {
  initialData: { title: '', content: '' }
};

export default BlogPostForm;
