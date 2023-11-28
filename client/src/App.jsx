// import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from './assets/vite.svg';
// import BlogPostForm from './Components/BlogPostForm'; // make sure to create this component
// import './App.css';
// import SignIn from './SignIn';

// function App() {
//   const [count, setCount] = useState(0);
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [currentBlogPost, setCurrentBlogPost] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Fetch blog posts when the component mounts
//   useEffect(() => {
//     fetchBlogPosts();
//   }, []);

//   const fetchBlogPosts = async () => {
//     const response = await fetch('/api/blogPosts');
//     const data = await response.json();
//     setBlogPosts(data);
//   };
//   const handleLogin = (loggedIn) => {
//     setIsLoggedIn(loggedIn);
//   };

//   const saveBlogPost = async (blogPost) => {
//     const method = blogPost._id ? 'PUT' : 'POST';
//     const endpoint = blogPost._id ? `/api/blogPosts/${blogPost._id}` : '/api/blogPosts';
//     await fetch(endpoint, {
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(blogPost),
//     });
//     await fetchBlogPosts();
//     setCurrentBlogPost({});
//   };

//   const editBlogPost = (blogPost) => {
//     setCurrentBlogPost(blogPost);
//   };

//   const deleteBlogPost = async (id) => {
//     await fetch(`/api/blogPosts/${id}`, {
//       method: 'DELETE',
//     });
//     await fetchBlogPosts();
//   };

//   const clearCurrentBlogPost = () => {
//     setCurrentBlogPost({});
//   };

//   return (
//     <>
   
//       <div>
//         <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank" rel="noreferrer">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR updates.
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> 

//       {/* Blog Posts Section */}
//       <section>
//         <h2>Blog Posts</h2>
//         <BlogPostForm saveBlogPost={saveBlogPost} initialData={currentBlogPost} clear={clearCurrentBlogPost} />
//         {blogPosts.map((post) => (
//           <article key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <button onClick={() => editBlogPost(post)}>Edit</button>
//             <button onClick={() => deleteBlogPost(post._id)}>Delete</button>
//           </article>
//         ))}
//       </section>
//       {!isLoggedIn && <SignIn onLogin={handleLogin} />}
//     </>
//   );
// }

// export default App;


import Navbar from './Components/Navigation/navbar'
import Register from "./Components/Register/Register"
import Profile from "./Components/Profile/Profile"
import SignIn from "./Components/SignIn/SignIn"
import Posts from "./Components/Posts/Posts"
import Home from "./Components/Home/Home"
import { Route, Routes } from 'react-router-dom'

function App(){
  return(
    <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/posts' element={<Posts />}/>
      </Routes>     
    </div>
    </>
  ) 

}
export default App;