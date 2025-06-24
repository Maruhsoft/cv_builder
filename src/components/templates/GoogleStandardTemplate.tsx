import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface GoogleStandardTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const GoogleStandardTemplate: React.FC<GoogleStandardTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    lineHeight: '1.2',
  } as React.CSSProperties;

  return (
    <div className="cv-google-standard max-w-4xl mx-auto bg-white" style={templateStyle}>
      {/* Header - Compact */}
      <div className="border-b border-gray-300 pb-2 mb-3">
        <div className="text-center">
          <h1 className="text-lg font-bold text-black mb-1">
            {personalInfo.name || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span>•</span>
            )}
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span>•</span>
            )}
            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span>•</span>
            )}
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin}</span>
            )}
            {personalInfo.github && (
              <span>•</span>
            )}
            {personalInfo.github && (
              <span>{personalInfo.github}</span>
            )}
          </div>
        </div>
      </div>

      {/* Content - Maximum density */}
      <div className="space-y-3">
        {sortedSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="text-sm font-bold text-black mb-1 uppercase tracking-wide border-b border-gray-200">
              {section.title}
            </h2>
            <div
              className="google-content text-xs text-gray-800 leading-tight"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              style={{
                fontSize: '11px',
                lineHeight: '1.3'
              }}
            />
          </div>
        ))}
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
          font-size: 11px !important;
        }
        .google-content ul {
          margin: 2px 0 !important;
          padding-left: 16px !important;
        }
        .google-content li {
          margin: 1px 0 !important;
          font-size: 11px !important;
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

export default GoogleStandardTemplate;