import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleCompactTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleCompactTemplate: React.FC<GoogleCompactTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // For compact template, all sections go in main flow regardless of placement
  // but we still respect the placement for ordering
  const allSections = sortedSections;

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '9px',
    lineHeight: '1.0',
  } as React.CSSProperties;

  return (
    <div className="cv-google-compact max-w-4xl mx-auto bg-white p-2" style={templateStyle}>
      {/* Minimal header */}
      <div className="text-center mb-1">
        <h1 className="text-sm font-bold text-black inline">
          {personalInfo.name || 'Your Name'}
        </h1>
        <span className="text-xs text-gray-600 ml-2">
          {[personalInfo.email, personalInfo.phone, personalInfo.linkedin]
            .filter(Boolean).join(' • ')}
        </span>
      </div>

      {/* Ultra-compact sections */}
      <div className="space-y-1">
        {allSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="text-xs font-bold text-black inline uppercase mr-2">
              {section.title}:
            </h2>
            <div
              className="google-compact-content inline text-xs text-gray-800"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .google-compact-content h3 {
          font-size: 10px !important;
          font-weight: bold !important;
          margin: 0 !important;
          color: #000 !important;
          display: inline !important;
        }
        .google-compact-content h3:after {
          content: " - ";
          font-weight: normal;
        }
        .google-compact-content p {
          margin: 0 !important;
          font-size: 9px !important;
          display: inline !important;
        }
        .google-compact-content ul {
          margin: 0 !important;
          padding: 0 !important;
          display: inline !important;
        }
        .google-compact-content li {
          margin: 0 !important;
          font-size: 9px !important;
          display: inline !important;
          list-style: none !important;
        }
        .google-compact-content li:before {
          content: "• ";
        }
        .google-compact-content strong {
          font-weight: bold !important;
        }
        .google-compact-content em {
          font-style: italic !important;
          color: #555 !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleCompactTemplate;