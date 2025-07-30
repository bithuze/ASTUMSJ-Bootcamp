// BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = sampleBlogs.find((b) => b.id === id);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load bookmark state from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarks.includes(id)) {
      bookmarks = bookmarks.filter((bid) => bid !== id);
      setIsBookmarked(false);
    } else {
      bookmarks.push(id);
      setIsBookmarked(true);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  if (!blog) {
    return <div className="p-8 text-center text-red-500">Blog not found.</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-600 mb-4">
        By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
        {blog.editedAt && (
          <span className="ml-2 text-xs text-yellow-600">
            (Edited on {new Date(blog.editedAt).toLocaleDateString()})
          </span>
        )}
      </div>
      <div className="mb-6 text-gray-800">{blog.content}</div>
      <div className="flex gap-2">
        <Link
          to={`/edit/${blog.id}`}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Edit
        </Link>
        <button
          className={`${
            isBookmarked ? "bg-yellow-600" : "bg-yellow-500"
          } text-white px-4 py-1 rounded hover:bg-yellow-600 transition`}
          onClick={handleBookmark}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
