import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{blog.title}</h2>

        <div className="text-sm text-gray-500 mt-1 mb-2 flex items-center gap-2">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-6 h-6 rounded-full"
          />
          <span>{blog.author}</span> ●{' '}
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <p className="text-gray-600 text-sm">{blog.description}</p>

        <div className="mt-4 text-right">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
