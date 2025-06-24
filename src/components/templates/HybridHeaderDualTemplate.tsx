import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface HybridHeaderDualTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const HybridHeaderDualTemplate: React.FC<HybridHeaderDualTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // Separate sections for different areas
  const headerSections = sortedSections.filter(section => 
    ['professional-summary'].includes(section.type)
  );
  
  const leftColumnSections = sortedSections.filter(section => 
    ['technical-skills', 'education', 'achievements', 'certifications'].includes(section.type)
  );
  
  const rightColumnSections = sortedSections.filter(section => 
    ['work-experience', 'projects'].includes(section.type)
  );

  const footerSections = sortedSections.filter(section => 
    ['additional-info', 'references', 'languages'].includes(section.type)
  );

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    lineHeight: '1.3',
  } as React.CSSProperties;

  return (
    <div className="cv-hybrid-header-dual max-w-4xl mx-auto bg-white" style={templateStyle}>
      {/* Full-Width Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-blue-200">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-1" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-1" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Header Sections */}
        {headerSections.map((section) => (
          <div key={section.id} className="section">
            <div
              className="hybrid-content text-sm text-gray-800 text-center max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>

      {/* Dual-Column Body */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left Column (1/3) */}
        <div className="space-y-4">
          {leftColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wide border-b border-blue-200 pb-1">
                {section.title}
              </h2>
              <div
                className="hybrid-content text-xs text-gray-800"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Right Column (2/3) */}
        <div className="col-span-2 space-y-4">
          {rightColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wide border-b border-blue-200 pb-1">
                {section.title}
              </h2>
              <div
                className="hybrid-content text-xs text-gray-800"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full-Width Footer */}
      {footerSections.length > 0 && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {footerSections.map((section) => (
              <div key={section.id} className="section">
                <h3 className="text-xs font-bold text-gray-700 mb-1 uppercase">
                  {section.title}
                </h3>
                <div
                  className="hybrid-content text-xs text-gray-600"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .hybrid-content h3 {
          font-size: 12px !important;
          font-weight: bold !important;
          margin: 3px 0 2px 0 !important;
          color: #1f2937 !important;
        }
        .hybrid-content p {
          margin: 2px 0 !important;
          font-size: 11px !important;
        }
        .hybrid-content ul {
          margin: 2px 0 !important;
          padding-left: 16px !important;
        }
        .hybrid-content li {
          margin: 1px 0 !important;
          font-size: 11px !important;
        }
        .hybrid-content strong {
          font-weight: bold !important;
          color: #1f2937 !important;
        }
        .hybrid-content em {
          font-style: italic !important;
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
};

export default HybridHeaderDualTemplate;