// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <nav className="bg-white text-white px-6 py-4 flex justify-between items-center w-full">
        <div className="font-bold text-lg">
          <Link to="/">My Blog</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline ">Home</Link>
          <Link to="/create" className="hover:underline">Create Blog</Link>
          <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
        </div>
      </nav>

      {/* Show hero section only on the homepage */}
      {isHome && (
  <div className="flex justify-center ">
    <div
      className="w-[1200px] h-[500px] bg-cover bg-center relative rounded-lg shadow-lg "
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to My Blog</h1>
        <p className="text-lg">Explore articles, ideas, and inspiration</p>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
