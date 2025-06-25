import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleSRETwoColumnTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleSRETwoColumnTemplate: React.FC<GoogleSRETwoColumnTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // SRE-specific column organization with placement awareness
  const leftColumnSections = sortedSections.filter(section => 
    section.placement === 'sidebar' ||
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'certifications', 'education', 'tools'].includes(section.type))
  );
  
  const rightColumnSections = sortedSections.filter(section => 
    section.placement === 'main' ||
    section.placement === 'right-column' ||
    (!section.placement && ['professional-summary', 'work-experience', 'projects', 'achievements'].includes(section.type))
  );

  // Handle unplaced sections
  const unplacedSections = sortedSections.filter(section => 
    !leftColumnSections.includes(section) && !rightColumnSections.includes(section)
  );

  // Add unplaced sections to appropriate columns
  unplacedSections.forEach(section => {
    if (section.type.includes('skill') || section.type.includes('education') || section.type.includes('certification')) {
      leftColumnSections.push(section);
    } else {
      rightColumnSections.push(section);
    }
  });

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    lineHeight: '1.1',
  } as React.CSSProperties;

  return (
    <div className="cv-google-sre-two-column max-w-4xl mx-auto bg-white p-3" style={templateStyle}>
      {/* Minimal header */}
      <div className="text-center mb-2">
        <h1 className="text-sm font-bold text-black">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-xs text-gray-600 leading-tight">
          {[personalInfo.email, personalInfo.phone, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Two-column SRE layout */}
      <div className="grid grid-cols-7 gap-3">
        {/* Left Column - Technical Skills (2/7) */}
        <div className="col-span-2 space-y-2">
          {leftColumnSections.map((section) => (
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

        {/* Right Column - Experience/Projects (5/7) */}
        <div className="col-span-5 space-y-2">
          {rightColumnSections.map((section) => (
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
      </div>

      <style jsx>{`
        .google-sre-content h3 {
          font-size: 10px !important;
          font-weight: bold !important;
          margin: 1px 0 !important;
          color: #000 !important;
          display: inline-block !important;
        }
        .google-sre-content p {
          margin: 1px 0 !important;
          font-size: 9px !important;
        }
        .google-sre-content ul {
          margin: 1px 0 !important;
          padding-left: 8px !important;
        }
        .google-sre-content li {
          margin: 0 !important;
          font-size: 9px !important;
          line-height: 1.1 !important;
        }
        .google-sre-content strong {
          font-weight: bold !important;
          color: #000 !important;
        }
        .google-sre-content em {
          font-style: italic !important;
          color: #444 !important;
          font-size: 8px !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleSRETwoColumnTemplate;