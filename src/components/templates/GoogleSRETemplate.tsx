import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleSRETemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleSRETemplate: React.FC<GoogleSRETemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // For single column template, all sections go in main flow
  const allSections = sortedSections;

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    lineHeight: '1.1',
  } as React.CSSProperties;

  return (
    <div className="cv-google-sre max-w-4xl mx-auto bg-white p-3" style={templateStyle}>
      {/* Minimal header */}
      <div className="text-center mb-2">
        <h1 className="text-sm font-bold text-black">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-xs text-gray-600 leading-tight">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.linkedin,
            personalInfo.github
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Maximum density content */}
      <div className="space-y-2">
        {allSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="text-xs font-bold text-black mb-1 uppercase border-b border-gray-400">
              {section.title}
            </h2>
            <div
              className="google-sre-content text-xs text-gray-800"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .google-sre-content h3 {
          font-size: 11px !important;
          font-weight: bold !important;
          margin: 1px 0 !important;
          color: #000 !important;
          display: inline-block !important;
        }
        .google-sre-content p {
          margin: 1px 0 !important;
          font-size: 10px !important;
        }
        .google-sre-content ul {
          margin: 1px 0 !important;
          padding-left: 10px !important;
        }
        .google-sre-content li {
          margin: 0 !important;
          font-size: 10px !important;
          line-height: 1.1 !important;
        }
        .google-sre-content strong {
          font-weight: bold !important;
          color: #000 !important;
        }
        .google-sre-content em {
          font-style: italic !important;
          color: #444 !important;
          font-size: 9px !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleSRETemplate;