import React from 'react';

const ColorButton = ({ color, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: color,
      color: '#fff',
      border: '1px solid #000',
      borderRadius: '8px',
      padding: '0.7rem 1.3rem',
      margin: '0.25rem',
      cursor: 'pointer',
      fontSize: '1.15rem',
      fontWeight: 600,
      boxShadow: '0 2px 10px rgba(60,60,120,0.10)',
      transition: 'transform 0.13s, box-shadow 0.13s',
      outline: 'none',
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(60,60,120,0.18)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(60,60,120,0.10)';
    }}
  >
    {children || color}
  </button>
);

export default ColorButton; 