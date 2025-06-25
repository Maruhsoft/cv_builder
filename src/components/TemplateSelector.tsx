import React from 'react';
import { Template } from '../types/cv';
import { CheckCircle2, HelpCircle, Users, Zap, Layout } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  const getTemplateIcon = (templateId: string) => {
    if (templateId.includes('google')) return Users;
    if (templateId.includes('compact') || templateId.includes('technical')) return Zap;
    return Layout;
  };

  const getTemplateTooltip = (template: Template) => {
    const tooltips: { [key: string]: string } = {
      'google-standard': 'Clean, ATS-friendly format preferred by Google recruiters. Best for software engineering roles.',
      'google-standard-two-column': 'Two-column layout with sidebar for skills. Maximizes space while maintaining readability.',
      'google-technical': 'Ultra-compact format for senior roles with extensive experience. Fits more content per page.',
      'google-technical-two-column': 'Dense two-column layout for technical leads with comprehensive experience.',
      'google-sre': 'Optimized for Site Reliability Engineer positions with focus on systems and operations.',
      'google-sre-two-column': 'SRE-focused layout with dedicated sections for technical skills and certifications.',
      'google-compact': 'Maximum information density for professionals with 10+ years experience.',
      'google-executive': 'Leadership-focused layout emphasizing management experience and strategic achievements.',
      'hybrid-header-dual': 'Modern layout with full-width header and dual-column body. Great for all roles.',
      'triple-section': 'Three-column middle section for organizing diverse skills and experiences.',
      'asymmetrical-70-30': 'Modern asymmetrical design with 70-30 split. Perfect for creative and technical roles.',
      't-shaped-layout': 'T-shaped design with wide header and narrow sidebar. Ideal for management positions.'
    };
    return tooltips[template.id] || template.description;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Templates are optimized for different roles and experience levels
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const IconComponent = getTemplateIcon(template.id);
          return (
            <div
              key={template.id}
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md group ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                  <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                  <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 max-w-xs">
                      {getTemplateTooltip(template)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{template.description}</p>
                <div className="flex items-center justify-between">
                  <div className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    {template.targetRole}
                  </div>
                  {template.id.includes('google') && (
                    <span className="text-xs text-green-600 font-medium">ATS Optimized</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;