import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface GoogleStandardTwoColumnTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleStandardTwoColumnTemplate: React.FC<GoogleStandardTwoColumnTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // Separate sections based on placement or fallback to type
  const leftColumnSections = sortedSections.filter(section => 
    section.placement === 'sidebar' || 
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'education', 'achievements', 'certifications'].includes(section.type))
  );
  
  const rightColumnSections = sortedSections.filter(section => 
    section.placement === 'main' || 
    section.placement === 'right-column' ||
    (!section.placement && ['professional-summary', 'work-experience', 'projects'].includes(section.type))
  );

  // Handle sections without specific placement
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
    fontSize: '11px',
    lineHeight: '1.2',
  } as React.CSSProperties;

  return (
    <div className="cv-google-standard-two-column max-w-4xl mx-auto bg-white" style={templateStyle}>
      {/* Header */}
      <div className="border-b border-gray-300 pb-2 mb-3">
        <div className="text-center">
          <h1 className="text-lg font-bold text-black mb-1">
            {personalInfo.name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <><span>•</span><span>{personalInfo.phone}</span></>}
            {personalInfo.location && <><span>•</span><span>{personalInfo.location}</span></>}
            {personalInfo.linkedin && <><span>•</span><span>{personalInfo.linkedin}</span></>}
            {personalInfo.github && <><span>•</span><span>{personalInfo.github}</span></>}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column - Narrower (1/3) */}
        <div className="space-y-3">
          {leftColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-black mb-1 uppercase tracking-wide border-b border-gray-200">
                {section.title}
              </h2>
              <div
                className="google-content text-xs text-gray-800 leading-tight"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
                style={{ fontSize: '10px', lineHeight: '1.3' }}
              />
            </div>
          ))}
        </div>

        {/* Right Column - Wider (2/3) */}
        <div className="col-span-2 space-y-3">
          {rightColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-black mb-1 uppercase tracking-wide border-b border-gray-200">
                {section.title}
              </h2>
              <div
                className="google-content text-xs text-gray-800 leading-tight"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
                style={{ fontSize: '11px', lineHeight: '1.3' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .google-content h3 {
          font-size: 12px !important;
          font-weight: bold !important;
          margin: 4px 0 2px 0 !important;
          color: #000 !important;
        }
        .google-content p {
          margin: 2px 0 !important;
        }
        .google-content ul {
          margin: 2px 0 !important;
          padding-left: 14px !important;
        }
        .google-content li {
          margin: 1px 0 !important;
        }
        .google-content strong {
          font-weight: bold !important;
        }
        .google-content em {
          font-style: italic !important;
          color: #666 !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleStandardTwoColumnTemplate;