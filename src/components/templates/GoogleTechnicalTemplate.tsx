import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleTechnicalTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleTechnicalTemplate: React.FC<GoogleTechnicalTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    lineHeight: '1.15',
  } as React.CSSProperties;

  return (
    <div className="cv-google-technical max-w-4xl mx-auto bg-white p-4" style={templateStyle}>
      {/* Ultra-compact header */}
      <div className="text-center border-b border-black pb-1 mb-2">
        <h1 className="text-base font-bold text-black">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-xs text-gray-700">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin,
            personalInfo.github
          ].filter(Boolean).join(' • ')}
        </div>
      </div>

      {/* Two-column layout for maximum space efficiency */}
      <div className="grid grid-cols-1 gap-2">
        {sortedSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="text-xs font-bold text-black mb-1 uppercase tracking-wider">
              {section.title}
            </h2>
            <div
              className="google-technical-content text-xs text-gray-800"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .google-technical-content h3 {
          font-size: 11px !important;
          font-weight: bold !important;
          margin: 2px 0 1px 0 !important;
          color: #000 !important;
          display: inline !important;
        }
        .google-technical-content h3:after {
          content: " | ";
          font-weight: normal;
          color: #666;
        }
        .google-technical-content p {
          margin: 1px 0 !important;
          font-size: 10px !important;
          display: inline !important;
        }
        .google-technical-content ul {
          margin: 1px 0 !important;
          padding-left: 12px !important;
        }
        .google-technical-content li {
          margin: 0 !important;
          font-size: 10px !important;
          line-height: 1.2 !important;
        }
        .google-technical-content strong {
          font-weight: bold !important;
        }
        .google-technical-content em {
          font-style: italic !important;
          color: #555 !important;
          font-size: 9px !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTechnicalTemplate;