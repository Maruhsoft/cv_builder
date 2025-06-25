import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';

interface GoogleExecutiveTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleExecutiveTemplate: React.FC<GoogleExecutiveTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // Executive layout with placement awareness
  const leftColumnSections = sortedSections.filter(section => 
    section.placement === 'sidebar' ||
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'leadership', 'certifications'].includes(section.type))
  );
  
  const mainSections = sortedSections.filter(section => 
    section.placement === 'main' ||
    section.placement === 'right-column' ||
    (!section.placement && ['professional-summary', 'work-experience', 'achievements', 'projects'].includes(section.type))
  );

  // Handle unplaced sections
  const unplacedSections = sortedSections.filter(section => 
    !leftColumnSections.includes(section) && !mainSections.includes(section)
  );

  // Add unplaced sections to appropriate columns
  unplacedSections.forEach(section => {
    if (section.type.includes('skill') || section.type.includes('education') || section.type.includes('certification')) {
      leftColumnSections.push(section);
    } else {
      mainSections.push(section);
    }
  });

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    lineHeight: '1.2',
  } as React.CSSProperties;

  return (
    <div className="cv-google-executive max-w-4xl mx-auto bg-white" style={templateStyle}>
      {/* Executive header */}
      <div className="text-center border-b-2 border-black pb-2 mb-3">
        <h1 className="text-xl font-bold text-black mb-1">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-sm font-semibold text-gray-700 mb-1">
          Senior Engineering Leader | Technical Director
        </div>
        <div className="text-xs text-gray-600">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin]
            .filter(Boolean).join(' • ')}
        </div>
      </div>

      {/* Three-column executive layout */}
      <div className="grid grid-cols-4 gap-4">
        {/* Left sidebar - Leadership & Skills */}
        <div className="space-y-3">
          {leftColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-black mb-1 uppercase tracking-wide">
                {section.title}
              </h2>
              <div
                className="google-executive-content text-xs text-gray-800"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Main content - Experience & Achievements */}
        <div className="col-span-3 space-y-3">
          {mainSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300">
                {section.title}
              </h2>
              <div
                className="google-executive-content text-xs text-gray-800"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .google-executive-content h3 {
          font-size: 12px !important;
          font-weight: bold !important;
          margin: 3px 0 2px 0 !important;
          color: #000 !important;
        }
        .google-executive-content p {
          margin: 2px 0 !important;
          font-size: 11px !important;
        }
        .google-executive-content ul {
          margin: 2px 0 !important;
          padding-left: 16px !important;
        }
        .google-executive-content li {
          margin: 1px 0 !important;
          font-size: 11px !important;
        }
        .google-executive-content strong {
          font-weight: bold !important;
        }
        .google-executive-content em {
          font-style: italic !important;
          color: #666 !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleExecutiveTemplate;