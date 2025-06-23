import React, { useState, useEffect, useRef } from 'react';
import { FileText, Eye, Settings, Download } from 'lucide-react';
import { CVSection, CVData, Template } from './types/cv';
import { extractSectionsFromMarkdown } from './utils/markdownParser';
import FileUpload from './components/FileUpload';
import TemplateSelector from './components/TemplateSelector';
import CustomizationPanel from './components/CustomizationPanel';
import CVPreview from './components/CVPreview';
import SectionEditor from './components/SectionEditor';
import PersonalInfoEditor from './components/PersonalInfoEditor';
import ExportPanel from './components/ExportPanel';
import SampleMarkdown from './components/SampleMarkdown';

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with gradient header',
    targetRole: 'Frontend Developer',
    preview: '/modern-preview.jpg',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic, formal layout for corporate environments',
    targetRole: 'Backend Developer',
    preview: '/professional-preview.jpg',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique sidebar design for creative professionals',
    targetRole: 'Full Stack Developer',
    preview: '/creative-preview.jpg',
  },
];

const defaultSections: CVSection[] = [
  {
    id: 'summary',
    type: 'professional-summary',
    title: 'Professional Summary',
    content: 'Experienced software developer with expertise in modern web technologies...',
    order: 0,
    required: true,
  },
  {
    id: 'skills',
    type: 'technical-skills',
    title: 'Technical Skills',
    content: '- **Frontend:** React, TypeScript, Vue.js\n- **Backend:** Node.js, Python\n- **Database:** PostgreSQL, MongoDB',
    order: 1,
    required: true,
  },
  {
    id: 'experience',
    type: 'work-experience',
    title: 'Work Experience',
    content: '### Senior Developer | Company Name\n*2021 - Present*\n- Led development of web applications\n- Mentored junior developers',
    order: 2,
    required: true,
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: '### Bachelor of Science in Computer Science\n*University Name | 2017 - 2021*',
    order: 3,
    required: true,
  },
];

function App() {
  const [cvData, setCvData] = useState<CVData>({
    sections: defaultSections,
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
    },
    template: 'modern',
    customization: {
      primaryColor: '#2563eb',
      secondaryColor: '#4f46e5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 14,
      spacing: 1.5,
    },
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'export'>('edit');
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
    }, 1000);

    return () => clearTimeout(timer);
  }, [cvData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cvBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setCvData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleFileUpload = (content: string) => {
    const sections = extractSectionsFromMarkdown(content);
    if (sections.length > 0) {
      setCvData(prev => ({
        ...prev,
        sections: sections,
      }));
    }
  };

  const handleSectionsChange = (sections: CVSection[]) => {
    setCvData(prev => ({
      ...prev,
      sections,
    }));
  };

  const handlePersonalInfoChange = (personalInfo: any) => {
    setCvData(prev => ({
      ...prev,
      personalInfo,
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setCvData(prev => ({
      ...prev,
      template: templateId,
    }));
  };

  const handleCustomizationChange = (key: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CV Builder Pro</h1>
                <p className="text-sm text-gray-600">Create professional resumes in minutes</p>
              </div>
            </div>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                  activeTab === 'export'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {activeTab === 'edit' && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <PersonalInfoEditor
                    personalInfo={cvData.personalInfo}
                    onPersonalInfoChange={handlePersonalInfoChange}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <TemplateSelector
                    templates={templates}
                    selectedTemplate={cvData.template}
                    onTemplateSelect={handleTemplateSelect}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <CustomizationPanel
                    customization={cvData.customization}
                    onCustomizationChange={handleCustomizationChange}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <SectionEditor
                    sections={cvData.sections}
                    onSectionsChange={handleSectionsChange}
                  />
                </div>

                <SampleMarkdown />
              </>
            )}

            {activeTab === 'export' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ExportPanel
                  previewRef={previewRef}
                  personalInfo={cvData.personalInfo}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              </div>
              <div className="p-4">
                <div
                  ref={previewRef}
                  className="transform scale-75 origin-top-left"
                  style={{ width: '133.33%', height: 'auto' }}
                >
                  <CVPreview
                    sections={cvData.sections}
                    personalInfo={cvData.personalInfo}
                    template={cvData.template}
                    customization={cvData.customization}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;