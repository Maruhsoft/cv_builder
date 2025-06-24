import React from 'react';
import { useTextFormatting } from './TextFormattingProvider';

const FormattingPreview: React.FC = () => {
  const { formatting } = useTextFormatting();

  const previewStyle = {
    fontSize: formatting.fontSizeUnit === 'pt' 
      ? `${formatting.fontSize}pt` 
      : `${formatting.fontSize}px`,
    color: formatting.textColor,
    opacity: formatting.textOpacity,
    letterSpacing: `${formatting.letterSpacing}px`,
    wordSpacing: `${formatting.wordSpacing}%`,
    textIndent: `${formatting.paragraphIndent}px`,
    lineHeight: formatting.lineHeight,
    marginTop: `${formatting.paragraphSpacingBefore}px`,
    marginBottom: `${formatting.paragraphSpacingAfter}px`,
    WebkitTextStroke: formatting.outlineWidth > 0 
      ? `${formatting.outlineWidth}px ${formatting.outlineColor}` 
      : 'none',
  } as React.CSSProperties;

  const sampleText = `This is a sample text to preview your formatting settings. You can see how the font size, color, spacing, and other properties affect the appearance of your text.

This is a second paragraph to demonstrate paragraph spacing and indentation. Notice how the line height and word spacing create different visual effects.`;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h4>
      <div className="bg-white p-4 rounded border min-h-32">
        <div style={previewStyle}>
          {sampleText.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <div>Font: {formatting.fontSize}{formatting.fontSizeUnit}</div>
        <div>Color: {formatting.textColor} (opacity: {Math.round(formatting.textOpacity * 100)}%)</div>
        <div>Letter spacing: {formatting.letterSpacing}px</div>
        <div>Line height: {formatting.lineHeight}</div>
        {formatting.outlineWidth > 0 && (
          <div>Outline: {formatting.outlineWidth}px {formatting.outlineColor}</div>
        )}
      </div>
    </div>
  );
};

export default FormattingPreview;