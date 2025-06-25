import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TShapedTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const TShapedTemplate: React.FC<TShapedTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  // T-shaped organization with placement awareness
  const headerSections = sortedSections.filter(section => 
    section.placement === 'header' ||
    (!section.placement && ['professional-summary'].includes(section.type))
  );
  
  const sidebarSections = sortedSections.filter(section => 
    section.placement === 'sidebar' ||
    section.placement === 'left-column' ||
    (!section.placement && ['technical-skills', 'education', 'certifications'].includes(section.type))
  );
  
  const mainSections = sortedSections.filter(section => 
    section.placement === 'main' ||
    section.placement === 'right-column' ||
    (!section.placement && ['work-experience', 'projects', 'achievements'].includes(section.type))
  );

  // Handle unplaced sections
  const unplacedSections = sortedSections.filter(section => 
    !headerSections.includes(section) &&
    !sidebarSections.includes(section) &&
    !mainSections.includes(section)
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
    <div className="cv-t-shaped max-w-4xl mx-auto bg-white shadow-lg" style={templateStyle}>
      {/* Wide Header (Top of T) */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-2">
              {personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-lg opacity-90 mb-4">Senior Engineering Leader</p>
            
            {/* Header Content */}
            {headerSections.map((section) => (
              <div key={section.id} className="section">
                <div
                  className="t-shaped-header-content text-sm opacity-95"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 opacity-75" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 opacity-75" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 opacity-75" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2 opacity-75" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-2 opacity-75" />
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* T-Shaped Body */}
      <div className="flex">
        {/* Narrow Sidebar (Left side of T stem) */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
                {section.title}
              </h2>
              <div
                className="t-shaped-sidebar-content text-xs text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Main Content Area (Right side of T stem) */}
        <div className="flex-1 p-6 space-y-6">
          {mainSections.map((section) => (
            <div key={section.id} className="section">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-slate-600 mr-4"></div>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                  {section.title}
                </h2>
              </div>
              <div
                className="t-shaped-content text-sm text-gray-700 ml-6"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .t-shaped-header-content p {
          margin: 0 !important;
          color: rgba(255, 255, 255, 0.95) !important;
          line-height: 1.4 !important;
        }
        .t-shaped-content h3 {
          font-size: 14px !important;
          font-weight: bold !important;
          margin: 4px 0 2px 0 !important;
          color: #1e293b !important;
        }
        .t-shaped-content p {
          margin: 3px 0 !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        .t-shaped-content ul {
          margin: 3px 0 !important;
          padding-left: 18px !important;
        }
        .t-shaped-content li {
          margin: 2px 0 !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        .t-shaped-content strong {
          font-weight: bold !important;
          color: #1e293b !important;
        }
        .t-shaped-content em {
          font-style: italic !important;
          color: #64748b !important;
        }
        .t-shaped-sidebar-content h3 {
          font-size: 11px !important;
          font-weight: bold !important;
          margin: 2px 0 1px 0 !important;
          color: #475569 !important;
        }
        .t-shaped-sidebar-content p {
          margin: 2px 0 !important;
          font-size: 10px !important;
        }
        .t-shaped-sidebar-content ul {
          margin: 2px 0 !important;
          padding-left: 14px !important;
        }
        .t-shaped-sidebar-content li {
          margin: 1px 0 !important;
          font-size: 10px !important;
          line-height: 1.3 !important;
        }
        .t-shaped-sidebar-content strong {
          font-weight: bold !important;
          color: #475569 !important;
        }
        .t-shaped-sidebar-content em {
          font-style: italic !important;
          color: #64748b !important;
        }
      `}</style>
    </div>
  );
};

export default TShapedTemplate;