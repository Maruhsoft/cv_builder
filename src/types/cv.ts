export interface CVSection {
  id: string;
  type: string;
  title: string;
  content: string;
  order: number;
  required: boolean;
  placement?: string; // Add placement property for template-aware positioning
}

export interface CVData {
  sections: CVSection[];
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  template: string;
  customization: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: number;
    spacing: number;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  targetRole: string;
  preview: string;
}

export interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    sections: number;
    contact: number;
    experience: number;
  };
  suggestions: string[];
  keywordMatches: string[];
  missingKeywords: string[];
}