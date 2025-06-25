import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface AsymmetricalTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const AsymmetricalTemplate: React.FC<AsymmetricalTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // 70-30 split organization with placement awareness
  const mainSections = sortedSections.filter(section => 
    section.placement === 'main' ||
    section.placement === 'right-column' ||
    (!section.placement && ['professional-summary', 'work-experience', 'projects', 'achievements'].includes(section.type))
  );
  
  const sidebarSections = sortedSections.filter(section => 
    section.placement === 'sidebar' ||
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'education', 'certifications', 'languages'].includes(section.type))
  );

  // Handle unplaced sections
  const unplacedSections = sortedSections.filter(section => 
    !mainSections.includes(section) && !sidebarSections.includes(section)
  );

  unplacedSections.forEach(section => {
    if (section.type.includes('skill') || section.type.includes('education')) {
      sidebarSections.push(section);
    } else {
      mainSections.push(section);
    }
  });

  const templateStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    lineHeight: '1.3',
  } as React.CSSProperties;

  return (
    <div className="cv-asymmetrical max-w-4xl mx-auto bg-white shadow-lg" style={templateStyle}>
      {/* Header with Diagonal Design Element */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 transform rotate-45 translate-x-16 -translate-y-16"></div>
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-lg opacity-90 mb-4">Professional Developer</p>
            </div>
            <div className="text-right space-y-1 text-sm opacity-90">
              {personalInfo.email && (
                <div className="flex items-center justify-end">
                  <span className="mr-2">{personalInfo.email}</span>
                  <Mail className="w-4 h-4" />
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center justify-end">
                  <span className="mr-2">{personalInfo.phone}</span>
                  <Phone className="w-4 h-4" />
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center justify-end">
                  <span className="mr-2">{personalInfo.location}</span>
                  <MapPin className="w-4 h-4" />
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center justify-end">
                  <span className="mr-2">{personalInfo.linkedin}</span>
                  <Linkedin className="w-4 h-4" />
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center justify-end">
                  <span className="mr-2">{personalInfo.github}</span>
                  <Github className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Asymmetrical 70-30 Layout */}
      <div className="flex min-h-screen">
        {/* Main Content Area (70%) */}
        <div className="flex-1 p-6 space-y-6" style={{ flexBasis: '70%' }}>
          {mainSections.map((section) => (
            <div key={section.id} className="section">
              <div className="flex items-center mb-3">
                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                  {section.title}
                </h2>
              </div>
              <div
                className="asymmetrical-content text-sm text-gray-700 ml-4"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Sidebar (30%) */}
        <div className="bg-gray-50 border-l-4 border-blue-600 p-6 space-y-6" style={{ flexBasis: '30%' }}>
          {sidebarSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-blue-700 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1">
                {section.title}
              </h2>
              <div
                className="asymmetrical-sidebar-content text-xs text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .asymmetrical-content h3 {
          font-size: 14px !important;
          font-weight: bold !important;
          margin: 4px 0 2px 0 !important;
          color: #1f2937 !important;
        }
        .asymmetrical-content p {
          margin: 3px 0 !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        .asymmetrical-content ul {
          margin: 3px 0 !important;
          padding-left: 18px !important;
        }
        .asymmetrical-content li {
          margin: 2px 0 !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        .asymmetrical-content strong {
          font-weight: bold !important;
          color: #1f2937 !important;
        }
        .asymmetrical-content em {
          font-style: italic !important;
          color: #6b7280 !important;
        }
        .asymmetrical-sidebar-content h3 {
          font-size: 11px !important;
          font-weight: bold !important;
          margin: 2px 0 1px 0 !important;
          color: #374151 !important;
        }
        .asymmetrical-sidebar-content p {
          margin: 2px 0 !important;
          font-size: 10px !important;
        }
        .asymmetrical-sidebar-content ul {
          margin: 2px 0 !important;
          padding-left: 14px !important;
        }
        .asymmetrical-sidebar-content li {
          margin: 1px 0 !important;
          font-size: 10px !important;
          line-height: 1.3 !important;
        }
        .asymmetrical-sidebar-content strong {
          font-weight: bold !important;
          color: #374151 !important;
        }
        .asymmetrical-sidebar-content em {
          font-style: italic !important;
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
};

export default AsymmetricalTemplate;