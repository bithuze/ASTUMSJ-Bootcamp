import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';

const sampleBlogs = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    author: 'Alice',
    description: 'A deep dive into useState and useEffect.',
    content: 'React Hooks are functions that let you use state and other React features without writing a class...',
    createdAt: '2024-07-01T12:00:00Z',
    editedAt: '2024-07-02T08:30:00Z',
  },
  {
    id: '2',
    title: 'Learning Conditional Rendering',
    author: 'Bob',
    description: 'Display content dynamically using ternary and &&.',
    content: 'Conditional rendering in React allows you to show elements based on certain conditions...',
    createdAt: '2024-07-02T15:45:00Z',
  },
];

const Home = () => {
  const [blogs, setBlogs] = useState(sampleBlogs);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
      {blogs.length === 0 ? (
        <div className="text-gray-500">No blog posts yet.</div>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <BlogCard blog={blog} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home; 