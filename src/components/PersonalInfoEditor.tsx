import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

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
    { key: 'name', label: 'Full Name', icon: User, required: true },
    { key: 'email', label: 'Email', icon: Mail, required: true },
    { key: 'phone', label: 'Phone', icon: Phone },
    { key: 'location', label: 'Location', icon: MapPin },
    { key: 'website', label: 'Website', icon: Globe },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { key: 'github', label: 'GitHub', icon: Github },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              <field.icon className="w-4 h-4 inline mr-1" />
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={personalInfo[field.key] || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoEditor;