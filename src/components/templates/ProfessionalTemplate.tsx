import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ProfessionalTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  sections,
  personalInfo,
  customization,
}) => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  const templateStyle = {
    fontFamily: customization.fontFamily,
    fontSize: `${customization.fontSize}px`,
    lineHeight: customization.spacing,
  } as React.CSSProperties;

  return (
    <div className="cv-professional max-w-4xl mx-auto bg-white shadow-lg" style={templateStyle}>
      {/* Header */}
      <div className="border-b-4 border-gray-800 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {personalInfo.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">Professional Software Developer</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                <span>{personalInfo.website}</span>
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
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {sortedSections.map((section) => (
          <div key={section.id} className="section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {section.title}
            </h2>
            <div
              className="prose prose-sm max-w-none text-gray-700 ml-4"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;