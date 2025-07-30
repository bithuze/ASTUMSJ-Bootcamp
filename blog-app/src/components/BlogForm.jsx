import React, { useState } from 'react';

const BlogForm = ({ initialValues = {}, onSubmit, submitLabel = 'Submit' }) => {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    author: initialValues.author || '',
    description: initialValues.description || '',
    content: initialValues.content || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-yellow-500 p-6 rounded shadow">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <label className="block font-medium mb-1 text-black">Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-black px-3 py-2 rounded text-black bg-white"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded min-h-[100px]"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default BlogForm; 