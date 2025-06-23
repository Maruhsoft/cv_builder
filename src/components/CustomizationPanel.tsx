import React from 'react';
import { Palette, Type, Weight as LineHeight } from 'lucide-react';

interface CustomizationPanelProps {
  customization: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: number;
    spacing: number;
  };
  onCustomizationChange: (key: string, value: any) => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  onCustomizationChange,
}) => {
  const colors = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Gray', value: '#6b7280' },
  ];

  const fonts = [
    { name: 'System', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    { name: 'Inter', value: '"Inter", sans-serif' },
    { name: 'Helvetica', value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Palette className="w-5 h-5 mr-2" />
        Customize
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full border-2 ${
                  customization.primaryColor === color.value
                    ? 'border-gray-900'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => onCustomizationChange('primaryColor', color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 inline mr-1" />
            Font Family
          </label>
          <select
            value={customization.fontFamily}
            onChange={(e) => onCustomizationChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size: {customization.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="18"
            value={customization.fontSize}
            onChange={(e) => onCustomizationChange('fontSize', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LineHeight className="w-4 h-4 inline mr-1" />
            Spacing: {customization.spacing}
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.5"
            value={customization.spacing}
            onChange={(e) => onCustomizationChange('spacing', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;