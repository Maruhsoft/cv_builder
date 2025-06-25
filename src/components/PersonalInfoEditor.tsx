import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, HelpCircle } from 'lucide-react';

interface PersonalInfoEditorProps {
  personalInfo: any;
  onPersonalInfoChange: (info: any) => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({
  personalInfo,
  onPersonalInfoChange,
}) => {
  const updateField = (field: string, value: string) => {
    onPersonalInfoChange({
      ...personalInfo,
      [field]: value,
    });
  };

  const fields = [
    { 
      key: 'name', 
      label: 'Full Name', 
      icon: User, 
      required: true,
      tooltip: 'Your full professional name as it should appear on your resume'
    },
    { 
      key: 'email', 
      label: 'Email', 
      icon: Mail, 
      required: true,
      tooltip: 'Professional email address - avoid nicknames or unprofessional addresses'
    },
    { 
      key: 'phone', 
      label: 'Phone', 
      icon: Phone,
      tooltip: 'Include country code if applying internationally (e.g., +1 555-123-4567)'
    },
    { 
      key: 'location', 
      label: 'Location', 
      icon: MapPin,
      tooltip: 'City, State/Country - helps employers understand your location for remote/local roles'
    },
    { 
      key: 'website', 
      label: 'Website', 
      icon: Globe,
      tooltip: 'Personal portfolio, blog, or professional website URL'
    },
    { 
      key: 'linkedin', 
      label: 'LinkedIn', 
      icon: Linkedin,
      tooltip: 'LinkedIn profile URL (e.g., linkedin.com/in/yourname)'
    },
    { 
      key: 'github', 
      label: 'GitHub', 
      icon: Github,
      tooltip: 'GitHub profile URL - essential for technical roles to showcase your code'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Complete contact information improves ATS compatibility
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-1">
                <field.icon className="w-4 h-4 inline" />
                <span>{field.label}</span>
                {field.required && <span className="text-red-500 ml-1">*</span>}
                <div className="group relative">
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {field.tooltip}
                  </div>
                </div>
              </div>
            </label>
            <input
              type="text"
              value={personalInfo[field.key] || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoEditor;