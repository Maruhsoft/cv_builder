import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TripleSectionTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const TripleSectionTemplate: React.FC<TripleSectionTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // Organize sections into different areas with placement awareness
  const bannerSections = sortedSections.filter(section => 
    section.placement === 'header' ||
    (!section.placement && ['professional-summary'].includes(section.type))
  );
  
  const leftColumnSections = sortedSections.filter(section => 
    section.placement === 'left-column' ||
    section.placement === 'middle-left' ||
    (!section.placement && ['technical-skills', 'certifications'].includes(section.type))
  );
  
  const middleColumnSections = sortedSections.filter(section => 
    section.placement === 'middle-center' ||
    section.placement === 'main' ||
    (!section.placement && ['work-experience', 'projects'].includes(section.type))
  );
  
  const rightColumnSections = sortedSections.filter(section => 
    section.placement === 'right-column' ||
    section.placement === 'middle-right' ||
    (!section.placement && ['education', 'achievements'].includes(section.type))
  );

  const bottomSections = sortedSections.filter(section => 
    section.placement === 'footer' ||
    (!section.placement && ['additional-info', 'references', 'languages', 'publications'].includes(section.type))
  );

  // Handle unplaced sections
  const unplacedSections = sortedSections.filter(section => 
    !bannerSections.includes(section) &&
    !leftColumnSections.includes(section) &&
    !middleColumnSections.includes(section) &&
    !rightColumnSections.includes(section) &&
    !bottomSections.includes(section)
  );

  // Distribute unplaced sections
  unplacedSections.forEach(section => {
    if (section.type.includes('skill')) {
      leftColumnSections.push(section);
    } else if (section.type.includes('education')) {
      rightColumnSections.push(section);
    } else {
      middleColumnSections.push(section);
    }
  });

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    lineHeight: '1.2',
  } as React.CSSProperties;

  return (
    <div className="cv-triple-section max-w-4xl mx-auto bg-white" style={templateStyle}>
      {/* Top Banner - Single Column */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm opacity-90">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-3 h-3 mr-1" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center">
                <Github className="w-3 h-3 mr-1" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Banner Content */}
        {bannerSections.map((section) => (
          <div key={section.id} className="section">
            <div
              className="triple-banner-content text-sm text-center max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>

      {/* Triple-Column Middle Section */}
      <div className="grid grid-cols-7 gap-4 p-4">
        {/* Left Column (2/7) */}
        <div className="col-span-2 space-y-3">
          {leftColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide border-b border-gray-300 pb-1">
                {section.title}
              </h2>
              <div
                className="triple-content text-xs text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Middle Column (3/7) */}
        <div className="col-span-3 space-y-3">
          {middleColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide border-b border-gray-300 pb-1">
                {section.title}
              </h2>
              <div
                className="triple-content text-xs text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Right Column (2/7) */}
        <div className="col-span-2 space-y-3">
          {rightColumnSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide border-b border-gray-300 pb-1">
                {section.title}
              </h2>
              <div
                className="triple-content text-xs text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Single-Column Bottom */}
      {bottomSections.length > 0 && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="space-y-3">
            {bottomSections.map((section) => (
              <div key={section.id} className="section">
                <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide">
                  {section.title}
                </h2>
                <div
                  className="triple-content text-xs text-gray-700"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .triple-banner-content p {
          margin: 0 !important;
          color: rgba(255, 255, 255, 0.95) !important;
        }
        .triple-content h3 {
          font-size: 11px !important;
          font-weight: bold !important;
          margin: 2px 0 1px 0 !important;
          color: #374151 !important;
        }
        .triple-content p {
          margin: 1px 0 !important;
          font-size: 10px !important;
        }
        .triple-content ul {
          margin: 1px 0 !important;
          padding-left: 12px !important;
        }
        .triple-content li {
          margin: 0 !important;
          font-size: 10px !important;
          line-height: 1.2 !important;
        }
        .triple-content strong {
          font-weight: bold !important;
          color: #374151 !important;
        }
        .triple-content em {
          font-style: italic !important;
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
};

export default TripleSectionTemplate;