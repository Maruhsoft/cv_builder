import React from 'react';
import { Download, FileText, Globe, FileType } from 'lucide-react';
import { exportToPDF, exportToHTML } from '../utils/pdfExport';

interface ExportPanelProps {
  previewRef: React.RefObject<HTMLDivElement>;
  personalInfo: any;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ previewRef, personalInfo }) => {
  const handleExportPDF = () => {
    if (previewRef.current) {
      const filename = `${personalInfo.name?.replace(/\s+/g, '_') || 'resume'}_CV.pdf`;
      exportToPDF(previewRef.current, filename);
    }
  };

  const handleExportHTML = () => {
    if (previewRef.current) {
      const filename = `${personalInfo.name?.replace(/\s+/g, '_') || 'resume'}_CV.html`;
      exportToHTML(previewRef.current, filename);
    }
  };

  const handleExportWord = () => {
    if (previewRef.current) {
      // Create a simplified Word document
      const htmlContent = previewRef.current.innerHTML;
      const wordContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset='utf-8'>
            <title>Resume</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .cv-container { max-width: 100%; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
      
      const blob = new Blob(['\ufeff', wordContent], {
        type: 'application/msword'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalInfo.name?.replace(/\s+/g, '_') || 'resume'}_CV.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Download className="w-5 h-5 mr-2" />
        Export Resume
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export PDF
        </button>
        <button
          onClick={handleExportHTML}
          className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Globe className="w-5 h-5 mr-2" />
          Export HTML
        </button>
        <button
          onClick={handleExportWord}
          className="flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          <FileType className="w-5 h-5 mr-2" />
          Export Word
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;