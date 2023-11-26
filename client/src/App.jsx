import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './vite.svg';
import BlogPostForm from './BlogPostForm'; // make sure to create this component
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentBlogPost, setCurrentBlogPost] = useState({});

  // Fetch blog posts when the component mounts
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    const response = await fetch('/api/blogPosts');
    const data = await response.json();
    setBlogPosts(data);
  };

  const saveBlogPost = async (blogPost) => {
    const method = blogPost._id ? 'PUT' : 'POST';
    const endpoint = blogPost._id ? `/api/blogPosts/${blogPost._id}` : '/api/blogPosts';
    await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPost),
    });
    await fetchBlogPosts();
    setCurrentBlogPost({});
  };

  const editBlogPost = (blogPost) => {
    setCurrentBlogPost(blogPost);
  };

  const deleteBlogPost = async (id) => {
    await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });
    await fetchBlogPosts();
  };

  const clearCurrentBlogPost = () => {
    setCurrentBlogPost({});
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR updates.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Blog Posts Section */}
      <section>
        <h2>Blog Posts</h2>
        <BlogPostForm saveBlogPost={saveBlogPost} initialData={currentBlogPost} clear={clearCurrentBlogPost} />
        {blogPosts.map((post) => (
          <article key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => editBlogPost(post)}>Edit</button>
            <button onClick={() => deleteBlogPost(post._id)}>Delete</button>
          </article>
        ))}
      </section>
    </>
  );
}

export default App;
