export interface CVSection {
  id: string;
  type: string;
  title: string;
  content: string;
  order: number;
  required: boolean;
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