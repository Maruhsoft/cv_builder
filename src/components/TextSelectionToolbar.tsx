import React, { useState, useEffect } from 'react';
import { Type, Palette, AlignLeft, Check, X } from 'lucide-react';
import { useTextFormatting } from './TextFormattingProvider';

const TextSelectionToolbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [quickFormatting, setQuickFormatting] = useState({
    fontSize: 12,
    textColor: '#000000',
    bold: false,
    italic: false,
  });

  const { formatting, updateFormatting, applyToSelection } = useTextFormatting();

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleQuickFormat = (property: string, value: any) => {
    updateFormatting(property as any, value);
    setQuickFormatting(prev => ({ ...prev, [property]: value }));
  };

  const applyFormatting = () => {
    applyToSelection();
    setIsVisible(false);
  };

  const cancelFormatting = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3"
      style={{
        left: position.x - 150,
        top: position.y - 60,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="flex items-center space-x-3">
        {/* Font Size */}
        <div className="flex items-center space-x-1">
          <Type className="w-4 h-4 text-gray-600" />
          <input
            type="number"
            min="8"
            max="72"
            value={quickFormatting.fontSize}
            onChange={(e) => handleQuickFormat('fontSize', parseInt(e.target.value))}
            className="w-12 px-1 py-1 text-xs border border-gray-300 rounded"
          />
        </div>

        {/* Text Color */}
        <div className="flex items-center space-x-1">
          <Palette className="w-4 h-4 text-gray-600" />
          <input
            type="color"
            value={quickFormatting.textColor}
            onChange={(e) => handleQuickFormat('textColor', e.target.value)}
            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        {/* Bold/Italic */}
        <div className="flex space-x-1">
          <button
            onClick={() => handleQuickFormat('bold', !quickFormatting.bold)}
            className={`px-2 py-1 text-xs font-bold border rounded ${
              quickFormatting.bold ? 'bg-blue-100 border-blue-300' : 'border-gray-300'
            }`}
          >
            B
          </button>
          <button
            onClick={() => handleQuickFormat('italic', !quickFormatting.italic)}
            className={`px-2 py-1 text-xs italic border rounded ${
              quickFormatting.italic ? 'bg-blue-100 border-blue-300' : 'border-gray-300'
            }`}
          >
            I
          </button>
        </div>

        {/* Apply/Cancel */}
        <div className="flex space-x-1 border-l border-gray-300 pl-2">
          <button
            onClick={applyFormatting}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
            title="Apply formatting"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={cancelFormatting}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextSelectionToolbar;