import React from 'react';
import { CVSection } from '../types/cv';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import GoogleStandardTemplate from './templates/GoogleStandardTemplate';
import GoogleTechnicalTemplate from './templates/GoogleTechnicalTemplate';
import GoogleSRETemplate from './templates/GoogleSRETemplate';
import GoogleStandardTwoColumnTemplate from './templates/GoogleStandardTwoColumnTemplate';
import GoogleTechnicalTwoColumnTemplate from './templates/GoogleTechnicalTwoColumnTemplate';
import GoogleSRETwoColumnTemplate from './templates/GoogleSRETwoColumnTemplate';
import GoogleCompactTemplate from './templates/GoogleCompactTemplate';
import GoogleExecutiveTemplate from './templates/GoogleExecutiveTemplate';
import HybridHeaderDualTemplate from './templates/HybridHeaderDualTemplate';
import TripleSectionTemplate from './templates/TripleSectionTemplate';
import AsymmetricalTemplate from './templates/AsymmetricalTemplate';
import TShapedTemplate from './templates/TShapedTemplate';

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
      case 'google-standard':
        return <GoogleStandardTemplate {...props} />;
      case 'google-standard-two-column':
        return <GoogleStandardTwoColumnTemplate {...props} />;
      case 'google-technical':
        return <GoogleTechnicalTemplate {...props} />;
      case 'google-technical-two-column':
        return <GoogleTechnicalTwoColumnTemplate {...props} />;
      case 'google-sre':
        return <GoogleSRETemplate {...props} />;
      case 'google-sre-two-column':
        return <GoogleSRETwoColumnTemplate {...props} />;
      case 'google-compact':
        return <GoogleCompactTemplate {...props} />;
      case 'google-executive':
        return <GoogleExecutiveTemplate {...props} />;
      case 'hybrid-header-dual':
        return <HybridHeaderDualTemplate {...props} />;
      case 'triple-section':
        return <TripleSectionTemplate {...props} />;
      case 'asymmetrical-70-30':
        return <AsymmetricalTemplate {...props} />;
      case 't-shaped-layout':
        return <TShapedTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      default:
        return <GoogleStandardTemplate {...props} />;
    }
  };

  return (
    <div className="cv-preview-container">
      {renderTemplate()}
    </div>
  );
};

export default CVPreview;