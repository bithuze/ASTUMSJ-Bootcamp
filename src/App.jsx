import { useState } from 'react';
import ColorButton from './components/ColorButton';
import ColorPreview from './components/ColorPreview';
import './App.css';

function App() {
  const [selectedColor, setSelectedColor] = useState('');
  const colors = [
    { name: 'Red', value: 'red', emoji: '🟥' },
    { name: 'Green', value: 'green', emoji: '🟩' },
    { name: 'Blue', value: 'blue', emoji: '🟦' },
    { name: 'Yellow', value: 'gold', emoji: '🟨' },
    { name: 'Purple', value: 'purple', emoji: '🟪' },
  ];

  return (
    <div className="palette-app">
      <h1>Color Palette Picker 🎨</h1>
      <div className="color-buttons">
        {colors.map((c) => (
          <ColorButton
            key={c.value}
            color={c.value}
            onClick={() => setSelectedColor(c.value)}
          >
            {c.emoji} {c.name}
          </ColorButton>
        ))}
      </div>
      <ColorPreview color={selectedColor} />
      <div style={{ textAlign: 'center' }}>
        <button
          className="reset-btn"
          onClick={() => setSelectedColor('')}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
