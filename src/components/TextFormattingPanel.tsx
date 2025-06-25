import React, { useState } from 'react';
import { Type, Palette, AlignLeft, Settings, Save, RotateCcw, HelpCircle } from 'lucide-react';

interface TextFormatting {
  fontSize: number;
  fontSizeUnit: 'pt' | 'px';
  textColor: string;
  textOpacity: number;
  outlineColor: string;
  outlineWidth: number;
  letterSpacing: number;
  wordSpacing: number;
  paragraphIndent: number;
  lineHeight: number;
  paragraphSpacingBefore: number;
  paragraphSpacingAfter: number;
  columnGap: number;
}

interface TextFormattingPanelProps {
  formatting: TextFormatting;
  onFormattingChange: (key: keyof TextFormatting, value: any) => void;
  onSavePreset: (name: string, formatting: TextFormatting) => void;
  onLoadPreset: (formatting: TextFormatting) => void;
  presets: { [key: string]: TextFormatting };
}

const TextFormattingPanel: React.FC<TextFormattingPanelProps> = ({
  formatting,
  onFormattingChange,
  onSavePreset,
  onLoadPreset,
  presets,
}) => {
  const [activeTab, setActiveTab] = useState<'size' | 'color' | 'spacing' | 'presets'>('size');
  const [presetName, setPresetName] = useState('');
  const [showColorPicker, setShowColorPicker] = useState<'text' | 'outline' | null>(null);

  const fontSizePresets = [
    { name: 'Small', value: 10 },
    { name: 'Medium', value: 12 },
    { name: 'Large', value: 16 },
    { name: 'X-Large', value: 20 },
  ];

  const colorPresets = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#008000', '#000080', '#808000', '#800080', '#008080',
    '#FFA500', '#FFC0CB', '#A52A2A', '#808080', '#000000', '#FFFFFF',
  ];

  const adjustFontSize = (percentage: number) => {
    const newSize = Math.round(formatting.fontSize * (1 + percentage / 100));
    onFormattingChange('fontSize', Math.max(8, Math.min(72, newSize)));
  };

  const resetToDefaults = () => {
    const defaults: TextFormatting = {
      fontSize: 12,
      fontSizeUnit: 'pt',
      textColor: '#000000',
      textOpacity: 1,
      outlineColor: '#000000',
      outlineWidth: 0,
      letterSpacing: 0,
      wordSpacing: 100,
      paragraphIndent: 0,
      lineHeight: 1.2,
      paragraphSpacingBefore: 0,
      paragraphSpacingAfter: 0,
      columnGap: 20,
    };
    
    Object.entries(defaults).forEach(([key, value]) => {
      onFormattingChange(key as keyof TextFormatting, value);
    });
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), formatting);
      setPresetName('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Type className="w-5 h-5 mr-2" />
            Text Formatting
          </h3>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Advanced text formatting options for fine-tuning your resume appearance
            </div>
          </div>
        </div>
        <button
          onClick={resetToDefaults}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          title="Reset all formatting to default values"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'size', label: 'Size', icon: Type, tooltip: 'Font size and scaling options' },
          { id: 'color', label: 'Color', icon: Palette, tooltip: 'Text color and opacity settings' },
          { id: 'spacing', label: 'Spacing', icon: AlignLeft, tooltip: 'Letter, word, and paragraph spacing' },
          { id: 'presets', label: 'Presets', icon: Settings, tooltip: 'Save and load formatting presets' },
        ].map((tab) => (
          <div key={tab.id} className="group relative flex-1">
            <button
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full px-3 py-2 rounded-md flex items-center justify-center space-x-1 transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {tab.tooltip}
            </div>
          </div>
        ))}
      </div>

      {/* Font Size Tab */}
      {activeTab === 'size' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Font Size: {formatting.fontSize}{formatting.fontSizeUnit}
              </label>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Recommended: 10-12pt for body text, 14-16pt for headings
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="number"
                min="8"
                max="72"
                value={formatting.fontSize}
                onChange={(e) => onFormattingChange('fontSize', parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formatting.fontSizeUnit}
                onChange={(e) => onFormattingChange('fontSizeUnit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pt">pt</option>
                <option value="px">px</option>
              </select>
            </div>
            <input
              type="range"
              min="8"
              max="72"
              value={formatting.fontSize}
              onChange={(e) => onFormattingChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fontSizePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => onFormattingChange('fontSize', preset.value)}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                    formatting.fontSize === preset.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {preset.name} ({preset.value}pt)
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relative Adjustments
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => adjustFontSize(-10)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                title="Decrease font size by 10%"
              >
                -10%
              </button>
              <button
                onClick={() => adjustFontSize(-25)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                title="Decrease font size by 25%"
              >
                -25%
              </button>
              <button
                onClick={() => adjustFontSize(10)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                title="Increase font size by 10%"
              >
                +10%
              </button>
              <button
                onClick={() => adjustFontSize(25)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                title="Increase font size by 25%"
              >
                +25%
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Tab */}
      {activeTab === 'color' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                style={{ backgroundColor: formatting.textColor }}
                onClick={() => setShowColorPicker(showColorPicker === 'text' ? null : 'text')}
                title="Click to open color picker"
              />
              <input
                type="text"
                value={formatting.textColor}
                onChange={(e) => onFormattingChange('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
            {showColorPicker === 'text' && (
              <div className="grid grid-cols-6 gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 border border-gray-300 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onFormattingChange('textColor', color);
                      setShowColorPicker(null);
                    }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Text Opacity: {Math.round(formatting.textOpacity * 100)}%
              </label>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Lower opacity creates lighter, more subtle text
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formatting.textOpacity}
              onChange={(e) => onFormattingChange('textOpacity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outline Color
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                style={{ backgroundColor: formatting.outlineColor }}
                onClick={() => setShowColorPicker(showColorPicker === 'outline' ? null : 'outline')}
                title="Click to open color picker"
              />
              <input
                type="text"
                value={formatting.outlineColor}
                onChange={(e) => onFormattingChange('outlineColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
            {showColorPicker === 'outline' && (
              <div className="grid grid-cols-6 gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 border border-gray-300 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onFormattingChange('outlineColor', color);
                      setShowColorPicker(null);
                    }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Outline Width: {formatting.outlineWidth}px
              </label>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Text outline for better contrast (use sparingly)
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={formatting.outlineWidth}
              onChange={(e) => onFormattingChange('outlineWidth', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Spacing Tab */}
      {activeTab === 'spacing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Letter Spacing: {formatting.letterSpacing}px
                </label>
                <div className="group relative">
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Space between individual letters
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="-5"
                max="20"
                step="0.5"
                value={formatting.letterSpacing}
                onChange={(e) => onFormattingChange('letterSpacing', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Word Spacing: {formatting.wordSpacing}%
                </label>
                <div className="group relative">
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Space between words (100% = normal)
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={formatting.wordSpacing}
                onChange={(e) => onFormattingChange('wordSpacing', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph Indent: {formatting.paragraphIndent}px
                </label>
                <div className="group relative">
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    First line indentation for paragraphs
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formatting.paragraphIndent}
                onChange={(e) => onFormattingChange('paragraphIndent', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Line Height: {formatting.lineHeight}
                </label>
                <div className="group relative">
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Vertical space between lines (1.2-1.5 recommended)
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0.8"
                max="3.0"
                step="0.1"
                value={formatting.lineHeight}
                onChange={(e) => onFormattingChange('lineHeight', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spacing Before: {formatting.paragraphSpacingBefore}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="2"
                value={formatting.paragraphSpacingBefore}
                onChange={(e) => onFormattingChange('paragraphSpacingBefore', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spacing After: {formatting.paragraphSpacingAfter}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="2"
                value={formatting.paragraphSpacingAfter}
                onChange={(e) => onFormattingChange('paragraphSpacingAfter', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Column Gap: {formatting.columnGap}px
              </label>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Space between columns in multi-column layouts
                </div>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formatting.columnGap}
              onChange={(e) => onFormattingChange('columnGap', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Presets Tab */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Save Current Settings as Preset
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSavePreset}
                disabled={!presetName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                title="Save current formatting as a preset"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Load Preset
            </label>
            <div className="space-y-2">
              {Object.entries(presets).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => onLoadPreset(preset)}
                  className="w-full text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-gray-500">
                    {preset.fontSize}{preset.fontSizeUnit} • {preset.textColor} • {preset.lineHeight} line height
                  </div>
                </button>
              ))}
              {Object.keys(presets).length === 0 && (
                <p className="text-gray-500 text-sm italic">No saved presets</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextFormattingPanel;