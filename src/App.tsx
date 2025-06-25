import React, { useState, useEffect, useRef } from 'react';
import { FileText, Eye, Settings, Download, Target, Save, Smartphone, HelpCircle } from 'lucide-react';
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
import TextFormattingPanel from './components/TextFormattingPanel';
import ATSScorePanel from './components/ATSScorePanel';
import { TextFormattingProvider } from './components/TextFormattingProvider';
import TextSelectionToolbar from './components/TextSelectionToolbar';
import FormattingPreview from './components/FormattingPreview';

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
  {
    id: 'hybrid-header-dual',
    name: 'Hybrid Header-Dual',
    description: 'Full-width header with dual-column body and footer',
    targetRole: 'All Roles',
    preview: '/hybrid-header-dual-preview.jpg',
  },
  {
    id: 'triple-section',
    name: 'Triple Section',
    description: 'Top banner + triple-column middle + single bottom',
    targetRole: 'Senior Professionals',
    preview: '/triple-section-preview.jpg',
  },
  {
    id: 'asymmetrical-70-30',
    name: 'Asymmetrical 70-30',
    description: 'Modern asymmetrical layout with clean transitions',
    targetRole: 'Creative & Technical',
    preview: '/asymmetrical-preview.jpg',
  },
  {
    id: 't-shaped-layout',
    name: 'T-Shaped Professional',
    description: 'Wide header + narrow sidebar + main content area',
    targetRole: 'Management & Leadership',
    preview: '/t-shaped-preview.jpg',
  },
];

const defaultSections: CVSection[] = [
  {
    id: 'summary',
    type: 'professional-summary',
    title: 'Summary',
    content: `Software Engineer with 5+ years building scalable systems. Expert in distributed systems, algorithms, and system design. Led teams of 8+ engineers delivering products used by millions.`,
    order: 0,
    required: true,
    placement: 'main',
  },
  {
    id: 'experience',
    type: 'work-experience',
    title: 'Experience',
    content: `### Senior Software Engineer | Meta

**Duration:** Jan 2022 – Present  
- Led development of distributed caching system serving 100M+ requests/day, reducing latency by 40%  
- Designed and implemented microservices architecture supporting 50+ engineering teams  
- Mentored 5 junior engineers, with 100% promotion rate within 18 months  
- **Technologies:** Java, Python, Kubernetes, Redis, PostgreSQL

### Software Engineer | Amazon

**Duration:** Jun 2019 – Dec 2021  
- Built real-time analytics platform processing 1TB+ data daily with 99.9% uptime  
- Optimized recommendation algorithms improving click-through rates by 25%  
- Collaborated with ML teams to deploy models serving 10M+ customers  
- **Technologies:** Python, AWS, Spark, DynamoDB, Docker`,
    order: 1,
    required: true,
    placement: 'main',
  },
  {
    id: 'skills',
    type: 'technical-skills',
    title: 'Technical Skills',
    content: `- **Languages:** Python, Java, C++, JavaScript, Go, SQL  
- **Systems:** AWS, GCP, Kubernetes, Docker, Redis, Kafka, Elasticsearch  
- **Databases:** PostgreSQL, MongoDB, DynamoDB, BigQuery  
- **ML/AI:** TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy  
- **Tools:** Git, Jenkins, Terraform, Prometheus, Grafana`,
    order: 2,
    required: true,
    placement: 'sidebar',
  },
  {
    id: 'projects',
    type: 'projects',
    title: 'Projects',
    content: `### Distributed Task Scheduler

**Technologies:** Python, Kubernetes, Redis  
- Built fault-tolerant task scheduling system handling 1M+ jobs/day  
- Implemented auto-scaling reducing infrastructure costs by 30%  
- **GitHub:** [github.com/username/task-scheduler](https://github.com/username/task-scheduler)

### Real-time Chat Application

**Technologies:** Node.js, WebSocket, MongoDB  
- Developed chat platform supporting 10K+ concurrent users  
- Implemented end-to-end encryption and message persistence  
- **Live Demo:** [chat-app-demo.com](https://chat-app-demo.com)`,
    order: 3,
    required: false,
    placement: 'main',
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: `### Master of Science in Computer Science | Stanford University

**Duration:** 2017 – 2019  
**GPA:** 3.9/4.0  
- **Specialization:** Distributed Systems and Machine Learning  
- **Relevant Coursework:** Advanced Algorithms, System Design, ML Theory

### Bachelor of Science in Computer Engineering | UC Berkeley

**Duration:** 2013 – 2017  
**GPA:** 3.8/4.0  
**Honors:** Magna Cum Laude`,
    order: 4,
    required: true,
    placement: 'sidebar',
  },
  {
    id: 'achievements',
    type: 'achievements',
    title: 'Achievements',
    content: `- **Patents:** 2 US patents in distributed systems and caching technologies  
- **Publications:** 3 peer-reviewed papers in top-tier conferences (SOSP, OSDI)  
- **Awards:** Employee of the Year 2023, Hackathon Winner (Best Technical Innovation)  
- **Certifications:** AWS Solutions Architect Professional, Google Cloud Professional`,
    order: 5,
    required: false,
    placement: 'sidebar',
  },
];

interface TextFormatting {
  fontSize: number;
  fontSizeUnit: 'pt' | 'px';
  textColor: string;
  textOpacity: number;
  outlineColor: string;
  outlineWidth: number;
  letterSpacing: number;
  wordSpacing: number;
  paragraphIndent: number;
  lineHeight: number;
  paragraphSpacingBefore: number;
  paragraphSpacingAfter: number;
  columnGap: number;
}

const defaultTextFormatting: TextFormatting = {
  fontSize: 12,
  fontSizeUnit: 'pt',
  textColor: '#000000',
  textOpacity: 1,
  outlineColor: '#000000',
  outlineWidth: 0,
  letterSpacing: 0,
  wordSpacing: 100,
  paragraphIndent: 0,
  lineHeight: 1.2,
  paragraphSpacingBefore: 0,
  paragraphSpacingAfter: 0,
  columnGap: 20,
};

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

  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'export' | 'formatting' | 'ats'>('edit');
  const [textFormatting, setTextFormatting] = useState<TextFormatting>(defaultTextFormatting);
  const [textFormattingPresets, setTextFormattingPresets] = useState<{ [key: string]: TextFormatting }>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-save functionality with improved feedback
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
      localStorage.setItem('textFormattingData', JSON.stringify(textFormatting));
      setLastSaved(new Date());
    }, 2000); // Increased to 2 seconds for better UX

    return () => clearTimeout(timer);
  }, [cvData, textFormatting]);

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

    const savedTextFormatting = localStorage.getItem('textFormattingData');
    if (savedTextFormatting) {
      try {
        const parsedTextFormatting = JSON.parse(savedTextFormatting);
        setTextFormatting(parsedTextFormatting);
      } catch (error) {
        console.error('Error loading text formatting data:', error);
      }
    }

    const savedPresets = localStorage.getItem('textFormattingPresets');
    if (savedPresets) {
      try {
        const parsedPresets = JSON.parse(savedPresets);
        setTextFormattingPresets(parsedPresets);
      } catch (error) {
        console.error('Error loading text formatting presets:', error);
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

  const handleTextFormattingChange = (key: keyof TextFormatting, value: any) => {
    setTextFormatting(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveTextFormattingPreset = (name: string, formatting: TextFormatting) => {
    const newPresets = {
      ...textFormattingPresets,
      [name]: { ...formatting },
    };
    setTextFormattingPresets(newPresets);
    localStorage.setItem('textFormattingPresets', JSON.stringify(newPresets));
  };

  const handleLoadTextFormattingPreset = (formatting: TextFormatting) => {
    setTextFormatting({ ...formatting });
  };

  const manualSave = () => {
    localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
    localStorage.setItem('textFormattingData', JSON.stringify(textFormatting));
    setLastSaved(new Date());
  };

  return (
    <TextFormattingProvider>
      <div className="min-h-screen bg-gray-100">
        <TextSelectionToolbar />
        
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Maruh CV Builder</h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Professional resume templates with advanced formatting</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Manual Save Button */}
                <div className="group relative">
                  <button
                    onClick={manualSave}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    title="Save now"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Manual save (auto-saves every 2 seconds)
                  </div>
                </div>
                
                {/* Mobile indicator */}
                {isMobile && (
                  <div className="group relative">
                    <div className="p-2 text-blue-600">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      Mobile view active
                    </div>
                  </div>
                )}

                {/* Help Button */}
                <div className="group relative">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
                    Professional CV builder with Google-standard templates, ATS optimization, and advanced formatting
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-3 overflow-x-auto">
              {[
                { id: 'edit', label: 'Edit', icon: Settings, tooltip: 'Edit resume content and sections' },
                { id: 'formatting', label: 'Format', icon: FileText, tooltip: 'Advanced text formatting options' },
                { id: 'ats', label: 'ATS Score', icon: Target, tooltip: 'Check ATS compatibility and optimization' },
                { id: 'preview', label: 'Preview', icon: Eye, tooltip: 'Live preview of your resume' },
                { id: 'export', label: 'Export', icon: Download, tooltip: 'Export to PDF, HTML, or Word' },
              ].map((tab) => (
                <div key={tab.id} className="group relative">
                  <button
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 rounded-md flex items-center space-x-1 sm:space-x-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {tab.tooltip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-8'}`}>
            {/* Left Panel */}
            <div className="space-y-4 sm:space-y-6">
              {activeTab === 'edit' && (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <FileUpload onFileUpload={handleFileUpload} />
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <PersonalInfoEditor
                      personalInfo={cvData.personalInfo}
                      onPersonalInfoChange={handlePersonalInfoChange}
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <TemplateSelector
                      templates={templates}
                      selectedTemplate={cvData.template}
                      onTemplateSelect={handleTemplateSelect}
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <SectionEditor
                      sections={cvData.sections}
                      onSectionsChange={handleSectionsChange}
                      selectedTemplate={cvData.template}
                      templates={templates}
                      lastSaved={lastSaved}
                    />
                  </div>

                  <SampleMarkdown />
                </>
              )}

              {activeTab === 'formatting' && (
                <>
                  <TextFormattingPanel
                    formatting={textFormatting}
                    onFormattingChange={handleTextFormattingChange}
                    onSavePreset={handleSaveTextFormattingPreset}
                    onLoadPreset={handleLoadTextFormattingPreset}
                    presets={textFormattingPresets}
                  />
                  <FormattingPreview />
                </>
              )}

              {activeTab === 'ats' && (
                <ATSScorePanel
                  sections={cvData.sections}
                  personalInfo={cvData.personalInfo}
                />
              )}

              {activeTab === 'export' && (
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <ExportPanel
                    previewRef={previewRef}
                    personalInfo={cvData.personalInfo}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>

            {/* Right Panel - Preview (Hidden on mobile when not in preview tab) */}
            {(!isMobile || activeTab === 'preview') && (
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-3 sm:p-4 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Live Preview</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {activeTab === 'formatting' 
                            ? 'Select text to apply formatting' 
                            : 'Professional resume layout'
                          }
                        </p>
                      </div>
                      <div className="group relative">
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Real-time preview of your resume
                        </div>
                      </div>
                    </div>
                    {lastSaved && (
                      <p className="text-xs text-green-600 mt-1">
                        Auto-saved at {lastSaved.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <div className="p-2 sm:p-4">
                    <div
                      ref={previewRef}
                      className={`transform origin-top-left ${
                        isMobile ? 'scale-50' : 'scale-75'
                      }`}
                      style={{ 
                        width: isMobile ? '200%' : '133.33%', 
                        height: 'auto' 
                      }}
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
            )}
          </div>
        </main>
      </div>
    </TextFormattingProvider>
  );
}

export default App;
