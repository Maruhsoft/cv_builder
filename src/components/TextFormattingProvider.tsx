import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface TextFormattingContextType {
  formatting: TextFormatting;
  updateFormatting: (key: keyof TextFormatting, value: any) => void;
  applyToSelection: () => void;
  applyToDocument: () => void;
  savePreset: (name: string, formatting: TextFormatting) => void;
  loadPreset: (formatting: TextFormatting) => void;
  presets: { [key: string]: TextFormatting };
  selectedText: string;
  setSelectedText: (text: string) => void;
}

const defaultFormatting: TextFormatting = {
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

const TextFormattingContext = createContext<TextFormattingContextType | undefined>(undefined);

export const useTextFormatting = () => {
  const context = useContext(TextFormattingContext);
  if (!context) {
    throw new Error('useTextFormatting must be used within a TextFormattingProvider');
  }
  return context;
};

interface TextFormattingProviderProps {
  children: React.ReactNode;
}

export const TextFormattingProvider: React.FC<TextFormattingProviderProps> = ({ children }) => {
  const [formatting, setFormatting] = useState<TextFormatting>(defaultFormatting);
  const [presets, setPresets] = useState<{ [key: string]: TextFormatting }>({});
  const [selectedText, setSelectedText] = useState('');

  // Load presets from localStorage on mount
  useEffect(() => {
    const savedPresets = localStorage.getItem('textFormattingPresets');
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (error) {
        console.error('Error loading text formatting presets:', error);
      }
    }
  }, []);

  // Save presets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('textFormattingPresets', JSON.stringify(presets));
  }, [presets]);

  const updateFormatting = (key: keyof TextFormatting, value: any) => {
    setFormatting(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const generateCSS = (formatting: TextFormatting): string => {
    const fontSize = formatting.fontSizeUnit === 'pt' 
      ? `${formatting.fontSize}pt` 
      : `${formatting.fontSize}px`;
    
    return `
      font-size: ${fontSize};
      color: ${formatting.textColor};
      opacity: ${formatting.textOpacity};
      letter-spacing: ${formatting.letterSpacing}px;
      word-spacing: ${formatting.wordSpacing}%;
      text-indent: ${formatting.paragraphIndent}px;
      line-height: ${formatting.lineHeight};
      margin-top: ${formatting.paragraphSpacingBefore}px;
      margin-bottom: ${formatting.paragraphSpacingAfter}px;
      column-gap: ${formatting.columnGap}px;
      ${formatting.outlineWidth > 0 ? `
        -webkit-text-stroke: ${formatting.outlineWidth}px ${formatting.outlineColor};
        text-stroke: ${formatting.outlineWidth}px ${formatting.outlineColor};
      ` : ''}
    `;
  };

  const applyToSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.cssText = generateCSS(formatting);
      
      try {
        range.surroundContents(span);
      } catch (error) {
        // If surroundContents fails, extract and wrap the contents
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
      }
      
      selection.removeAllRanges();
    }
  };

  const applyToDocument = () => {
    const elements = document.querySelectorAll('.cv-preview-container *');
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.cssText += generateCSS(formatting);
      }
    });
  };

  const savePreset = (name: string, formatting: TextFormatting) => {
    setPresets(prev => ({
      ...prev,
      [name]: { ...formatting },
    }));
  };

  const loadPreset = (presetFormatting: TextFormatting) => {
    setFormatting({ ...presetFormatting });
  };

  const value: TextFormattingContextType = {
    formatting,
    updateFormatting,
    applyToSelection,
    applyToDocument,
    savePreset,
    loadPreset,
    presets,
    selectedText,
    setSelectedText,
  };

  return (
    <TextFormattingContext.Provider value={value}>
      {children}
    </TextFormattingContext.Provider>
  );
};