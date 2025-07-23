import React from 'react';

const ColorPreview = ({ color }) => (
  <div
    style={{
      width: '160px',
      height: '120px',
      backgroundColor: color || '#f3f4f8',
      border: `3px solid ${color || '#d1d5db'}`,
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      color: color ? '#fff' : '#888',
      margin: '1.5rem auto 0.5rem auto',
      boxShadow: '0 4px 18px rgba(60,60,120,0.10)',
      transition: 'background 0.3s, border 0.3s',
      fontWeight: 600,
      letterSpacing: '0.5px',
    }}
  >
    {color ? color : 'No color selected'}
  </div>
);

export default ColorPreview; 