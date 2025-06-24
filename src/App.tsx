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
    id: 'google-standard',
    name: 'Google Standard',
    description: 'Google\'s preferred format for software engineering roles',
    targetRole: 'Software Engineer',
    preview: '/google-standard-preview.jpg',
  },
  {
    id: 'google-standard-two-column',
    name: 'Google Standard (2-Column)',
    description: 'Two-column layout with skills sidebar',
    targetRole: 'Software Engineer',
    preview: '/google-standard-two-column-preview.jpg',
  },
  {
    id: 'google-technical',
    name: 'Google Technical',
    description: 'Ultra-compact format for senior technical positions',
    targetRole: 'Senior SWE / Tech Lead',
    preview: '/google-technical-preview.jpg',
  },
  {
    id: 'google-technical-two-column',
    name: 'Google Technical (2-Column)',
    description: 'Ultra-dense two-column technical layout',
    targetRole: 'Senior SWE / Tech Lead',
    preview: '/google-technical-two-column-preview.jpg',
  },
  {
    id: 'google-sre',
    name: 'Google SRE',
    description: 'Optimized for Site Reliability Engineer positions',
    targetRole: 'Site Reliability Engineer',
    preview: '/google-sre-preview.jpg',
  },
  {
    id: 'google-sre-two-column',
    name: 'Google SRE (2-Column)',
    description: 'SRE-focused two-column layout',
    targetRole: 'Site Reliability Engineer',
    preview: '/google-sre-two-column-preview.jpg',
  },
  {
    id: 'google-compact',
    name: 'Google Ultra-Compact',
    description: 'Maximum information density for extensive experience',
    targetRole: 'Any Technical Role',
    preview: '/google-compact-preview.jpg',
  },
  {
    id: 'google-executive',
    name: 'Google Executive',
    description: 'Leadership-focused layout for senior positions',
    targetRole: 'Engineering Manager / Director',
    preview: '/google-executive-preview.jpg',
  },
];

const defaultSections: CVSection[] = [
  {
    id: 'summary',
    type: 'professional-summary',
    title: 'Summary',
    content: 'Software Engineer with 5+ years building scalable systems. Expert in distributed systems, algorithms, and system design. Led teams of 8+ engineers delivering products used by millions.',
    order: 0,
    required: true,
  },
  {
    id: 'experience',
    type: 'work-experience',
    title: 'Experience',
    content: '### Senior Software Engineer | Meta\n*Jan 2022 - Present*\n• Led development of distributed caching system serving 100M+ requests/day, reducing latency by 40%\n• Designed and implemented microservices architecture supporting 50+ engineering teams\n• Mentored 5 junior engineers, with 100% promotion rate within 18 months\n• Technologies: Java, Python, Kubernetes, Redis, PostgreSQL\n\n### Software Engineer | Amazon\n*Jun 2019 - Dec 2021*\n• Built real-time analytics platform processing 1TB+ data daily with 99.9% uptime\n• Optimized recommendation algorithms improving click-through rates by 25%\n• Collaborated with ML teams to deploy models serving 10M+ customers\n• Technologies: Python, AWS, Spark, DynamoDB, Docker',
    order: 1,
    required: true,
  },
  {
    id: 'skills',
    type: 'technical-skills',
    title: 'Technical Skills',
    content: '• **Languages:** Python, Java, C++, JavaScript, Go, SQL\n• **Systems:** AWS, GCP, Kubernetes, Docker, Redis, Kafka, Elasticsearch\n• **Databases:** PostgreSQL, MongoDB, DynamoDB, BigQuery\n• **ML/AI:** TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy\n• **Tools:** Git, Jenkins, Terraform, Prometheus, Grafana',
    order: 2,
    required: true,
  },
  {
    id: 'projects',
    type: 'projects',
    title: 'Projects',
    content: '### Distributed Task Scheduler\n*Python, Kubernetes, Redis*\n• Built fault-tolerant task scheduling system handling 1M+ jobs/day\n• Implemented auto-scaling reducing infrastructure costs by 30%\n• **[GitHub](https://github.com/username/task-scheduler)**\n\n### Real-time Chat Application\n*Node.js, WebSocket, MongoDB*\n• Developed chat platform supporting 10K+ concurrent users\n• Implemented end-to-end encryption and message persistence\n• **[Live Demo](https://chat-app-demo.com)**',
    order: 3,
    required: false,
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: '### Master of Science in Computer Science | Stanford University\n*2017 - 2019* | GPA: 3.9/4.0\n• Specialization: Distributed Systems and Machine Learning\n• Relevant Coursework: Advanced Algorithms, System Design, ML Theory\n\n### Bachelor of Science in Computer Engineering | UC Berkeley\n*2013 - 2017* | GPA: 3.8/4.0 | Magna Cum Laude',
    order: 4,
    required: true,
  },
  {
    id: 'achievements',
    type: 'achievements',
    title: 'Achievements',
    content: '• **Patents:** 2 US patents in distributed systems and caching technologies\n• **Publications:** 3 peer-reviewed papers in top-tier conferences (SOSP, OSDI)\n• **Awards:** Employee of the Year 2023, Hackathon Winner (Best Technical Innovation)\n• **Certifications:** AWS Solutions Architect Professional, Google Cloud Professional',
    order: 5,
    required: false,
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
    template: 'google-standard',
    customization: {
      primaryColor: '#2563eb',
      secondaryColor: '#4f46e5',
      fontFamily: 'Arial, sans-serif',
      fontSize: 11,
      spacing: 1.2,
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
                <h1 className="text-2xl font-bold text-gray-900">Google CV Builder</h1>
                <p className="text-sm text-gray-600">Google-standard resume templates for tech interviews</p>
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
                <p className="text-sm text-gray-600">Google-optimized format</p>
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