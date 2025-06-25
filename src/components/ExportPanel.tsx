import React from 'react';
import { Download, FileText, Globe, FileType, HelpCircle } from 'lucide-react';
import { exportToPDF, exportToHTML } from '../utils/pdfExport';

interface ExportPanelProps {
  previewRef: React.RefObject<HTMLDivElement>;
  personalInfo: any;
  isMobile?: boolean;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ previewRef, personalInfo, isMobile = false }) => {
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
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Export Resume
        </h3>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Export your resume in different formats for various applications
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`${isMobile ? 'relative' : 'group relative'}`}>
          <button
            onClick={handleExportPDF}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            Export PDF
          </button>
          {!isMobile && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Best for job applications and ATS systems
            </div>
          )}
        </div>
        
        <div className={`${isMobile ? 'relative' : 'group relative'}`}>
          <button
            onClick={handleExportHTML}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-5 h-5 mr-2" />
            Export HTML
          </button>
          {!isMobile && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              For web portfolios and online sharing
            </div>
          )}
        </div>
        
        <div className={`${isMobile ? 'relative' : 'group relative'}`}>
          <button
            onClick={handleExportWord}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            <FileType className="w-5 h-5 mr-2" />
            Export Word
          </button>
          {!isMobile && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              For further editing in Microsoft Word
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile-specific tooltips */}
      {isMobile && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>PDF:</strong> Best for job applications and ATS systems</p>
            <p><strong>HTML:</strong> For web portfolios and online sharing</p>
            <p><strong>Word:</strong> For further editing in Microsoft Word</p>
          </div>
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <HelpCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Export Tips:</p>
            <ul className="text-xs space-y-1">
              <li>• PDF format is recommended for most job applications</li>
              <li>• Ensure all content fits properly before exporting</li>
              <li>• Test your PDF with different ATS systems if possible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;