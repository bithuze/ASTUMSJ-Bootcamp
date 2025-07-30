// Bookmarks.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sampleBlogs = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    author: 'Alice',
    description: 'A deep dive into useState and useEffect.',
    createdAt: '2024-07-01T12:00:00Z',
  },
  {
    id: '2',
    title: 'Learning Conditional Rendering',
    author: 'Bob',
    description: 'Display content dynamically using ternary and &&.',
    createdAt: '2024-07-02T15:45:00Z',
  },
];

const Bookmarks = () => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const filtered = sampleBlogs.filter((b) => bookmarks.includes(b.id));
    setBookmarkedBlogs(filtered);
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📌 Bookmarked Blogs</h1>
      {bookmarkedBlogs.length === 0 ? (
        <p className="text-gray-500 text-center">No bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarkedBlogs.map((blog) => (
            <li
              key={blog.id}
              className="p-4 border rounded hover:shadow transition"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500">
                By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700">{blog.description}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                Read More
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
 