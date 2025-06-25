import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleTechnicalTwoColumnTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleTechnicalTwoColumnTemplate: React.FC<GoogleTechnicalTwoColumnTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // Separate sections for columns with placement awareness
  const leftColumnSections = sortedSections.filter(section => 
    section.placement === 'sidebar' ||
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'education', 'achievements', 'certifications', 'awards'].includes(section.type))
  );
  
  const rightColumnSections = sortedSections.filter(section => 
    section.placement === 'main' ||
    section.placement === 'right-column' ||
    (!section.placement && ['professional-summary', 'work-experience', 'projects', 'publications'].includes(section.type))
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
    <div className="cv-google-technical-two-column max-w-4xl mx-auto bg-white p-3" style={templateStyle}>
      {/* Ultra-compact header */}
      <div className="text-center border-b border-black pb-1 mb-2">
        <h1 className="text-base font-bold text-black">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-xs text-gray-700">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean).join(' • ')}
        </div>
      </div>

      {/* Two-column ultra-dense layout */}
      <div className="grid grid-cols-5 gap-3">
        {/* Left Column - Skills/Education (2/5) */}
        <div className="col-span-2 space-y-2">
          {leftColumnSections.map((section) => (
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

        {/* Right Column - Experience/Projects (3/5) */}
        <div className="col-span-3 space-y-2">
          {rightColumnSections.map((section) => (
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
      </div>

      <style jsx>{`
        .google-technical-content h3 {
          font-size: 10px !important;
          font-weight: bold !important;
          margin: 1px 0 !important;
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
          font-size: 9px !important;
          display: inline !important;
        }
        .google-technical-content ul {
          margin: 1px 0 !important;
          padding-left: 10px !important;
        }
        .google-technical-content li {
          margin: 0 !important;
          font-size: 9px !important;
          line-height: 1.1 !important;
        }
        .google-technical-content strong {
          font-weight: bold !important;
        }
        .google-technical-content em {
          font-style: italic !important;
          color: #555 !important;
          font-size: 8px !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTechnicalTwoColumnTemplate;