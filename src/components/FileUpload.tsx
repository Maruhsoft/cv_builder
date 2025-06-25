import React, { useRef } from 'react';
import { Upload, FileText, HelpCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900">Import Resume</h3>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Upload existing resume in Markdown or text format to get started quickly
          </div>
        </div>
      </div>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">Drop your markdown file here</p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>Supports .md and .txt files</span>
          </div>
          <div className="text-xs text-gray-500 max-w-md">
            <p><strong>Tip:</strong> Use markdown formatting like ### for headings, **bold** text, and • for bullet points</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.txt,text/markdown,text/plain"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUpload;