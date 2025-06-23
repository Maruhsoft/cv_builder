import React from 'react';
import { CVSection } from '../../types/cv';
import { parseMarkdown } from '../../utils/markdownParser';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface CreativeTemplateProps {
  sections: CVSection[];
  personalInfo: any;
  customization: any;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
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
    <div className="cv-creative max-w-4xl mx-auto bg-white shadow-lg" style={templateStyle}>
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
        {/* Sidebar */}
        <div className="bg-gray-900 text-white p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold">
                {personalInfo.name ? personalInfo.name.split(' ').map(n => n[0]).join('') : 'YN'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
            <p className="text-emerald-400 text-sm">Full Stack Developer</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3 uppercase text-sm tracking-wide">
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="break-all">{personalInfo.github}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 p-8 space-y-8">
          {sortedSections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                <span className="bg-emerald-100 px-4 py-2 rounded-lg">
                  {section.title}
                </span>
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;