import React from 'react';
import { CVSection } from '../types/cv';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface CVPreviewProps {
  sections: CVSection[];
  personalInfo: any;
  template: string;
  customization: any;
}

const CVPreview: React.FC<CVPreviewProps> = ({
  sections,
  personalInfo,
  template,
  customization,
}) => {
  const renderTemplate = () => {
    const props = { sections, personalInfo, customization };
    
    switch (template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="cv-preview-container">
      {renderTemplate()}
    </div>
  );
};

export default CVPreview;