import React, { useState, useEffect } from 'react';
import { CVSection, ATSScore } from '../types/cv';
import { Target, CheckCircle, AlertCircle, TrendingUp, Search, FileText, User, Briefcase, HelpCircle } from 'lucide-react';

interface ATSScorePanelProps {
  sections: CVSection[];
  personalInfo: any;
  jobDescription?: string;
}

const ATSScorePanel: React.FC<ATSScorePanelProps> = ({
  sections,
  personalInfo,
  jobDescription = '',
}) => {
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [targetJob, setTargetJob] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonTechKeywords = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'SQL', 'MongoDB', 'Git', 'Agile', 'Scrum', 'REST API', 'GraphQL', 'TypeScript',
    'Machine Learning', 'Data Analysis', 'Cloud Computing', 'DevOps', 'CI/CD',
    'Microservices', 'System Design', 'Database', 'Frontend', 'Backend', 'Full Stack'
  ];

  const analyzeATS = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const cvText = sections.map(s => s.content).join(' ').toLowerCase();
      const jobText = (targetJob + ' ' + jobDescription).toLowerCase();
      
      // Keyword Analysis
      const foundKeywords = commonTechKeywords.filter(keyword => 
        cvText.includes(keyword.toLowerCase())
      );
      
      const jobKeywords = commonTechKeywords.filter(keyword => 
        jobText.includes(keyword.toLowerCase())
      );
      
      const keywordScore = jobKeywords.length > 0 
        ? (foundKeywords.filter(k => jobKeywords.includes(k)).length / jobKeywords.length) * 100
        : (foundKeywords.length / commonTechKeywords.length) * 100;

      // Formatting Analysis
      const hasProperSections = ['experience', 'education', 'skills'].every(section =>
        sections.some(s => s.type.includes(section) || s.title.toLowerCase().includes(section))
      );
      
      const formattingScore = hasProperSections ? 85 : 60;

      // Contact Information Analysis
      const contactFields = ['name', 'email', 'phone'];
      const contactScore = (contactFields.filter(field => 
        personalInfo[field] && personalInfo[field].trim()
      ).length / contactFields.length) * 100;

      // Experience Analysis
      const experienceSection = sections.find(s => 
        s.type.includes('experience') || s.title.toLowerCase().includes('experience')
      );
      
      const hasQuantifiableResults = experienceSection?.content.match(/\d+[%+]|\$\d+|\d+[kmb]|\d+\+/gi);
      const experienceScore = experienceSection ? (hasQuantifiableResults ? 90 : 70) : 30;

      // Section Analysis
      const requiredSections = ['professional-summary', 'work-experience', 'technical-skills', 'education'];
      const sectionScore = (sections.filter(s => 
        requiredSections.some(req => s.type.includes(req))
      ).length / requiredSections.length) * 100;

      const overallScore = Math.round(
        (keywordScore * 0.3 + formattingScore * 0.2 + contactScore * 0.15 + 
         experienceScore * 0.2 + sectionScore * 0.15)
      );

      const suggestions = [];
      if (keywordScore < 70) suggestions.push('Add more relevant technical keywords from job descriptions');
      if (contactScore < 100) suggestions.push('Complete all contact information (name, email, phone)');
      if (experienceScore < 80) suggestions.push('Add quantifiable achievements with numbers and percentages');
      if (!hasQuantifiableResults) suggestions.push('Include specific metrics: "Increased performance by 40%", "Led team of 8"');
      if (sectionScore < 100) suggestions.push('Ensure all required sections are present and properly named');

      setAtsScore({
        overall: overallScore,
        breakdown: {
          keywords: Math.round(keywordScore),
          formatting: Math.round(formattingScore),
          sections: Math.round(sectionScore),
          contact: Math.round(contactScore),
          experience: Math.round(experienceScore),
        },
        suggestions,
        keywordMatches: foundKeywords,
        missingKeywords: jobKeywords.filter(k => !foundKeywords.includes(k)),
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return 'Excellent - Your resume is highly optimized for ATS systems';
    if (score >= 80) return 'Very Good - Minor improvements could boost your score';
    if (score >= 70) return 'Good - Some optimization needed for better ATS compatibility';
    if (score >= 60) return 'Fair - Significant improvements recommended';
    return 'Poor - Major optimization required for ATS compatibility';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            ATS Score Analysis
          </h3>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
              ATS (Applicant Tracking System) compatibility score based on keywords, formatting, and structure
            </div>
          </div>
        </div>
        {atsScore && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(atsScore.overall)} ${getScoreColor(atsScore.overall)}`}>
            {atsScore.overall}/100
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Target Job Title (Optional)
            </label>
            <div className="group relative">
              <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Helps analyze relevant keywords for your target role
              </div>
            </div>
          </div>
          <input
            type="text"
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            placeholder="e.g., Senior Software Engineer, Data Scientist"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={analyzeATS}
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing Resume...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyze ATS Score
            </>
          )}
        </button>
      </div>

      {atsScore && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(atsScore.overall)} mb-2`}>
              {atsScore.overall}%
            </div>
            <p className="text-gray-600 text-sm">
              {getScoreDescription(atsScore.overall)}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                key: 'keywords', 
                label: 'Keywords', 
                icon: Search,
                tooltip: 'Relevant technical and industry keywords found in your resume'
              },
              { 
                key: 'formatting', 
                label: 'Formatting', 
                icon: FileText,
                tooltip: 'Resume structure and ATS-friendly formatting'
              },
              { 
                key: 'contact', 
                label: 'Contact Info', 
                icon: User,
                tooltip: 'Completeness of contact information (name, email, phone)'
              },
              { 
                key: 'experience', 
                label: 'Experience', 
                icon: Briefcase,
                tooltip: 'Quality of experience section with quantifiable achievements'
              },
              { 
                key: 'sections', 
                label: 'Sections', 
                icon: TrendingUp,
                tooltip: 'Presence of all required resume sections'
              },
            ].map(({ key, label, icon: Icon, tooltip }) => (
              <div key={key} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <div className="group relative">
                      <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
                        {tooltip}
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${getScoreColor(atsScore.breakdown[key as keyof typeof atsScore.breakdown])}`}>
                    {atsScore.breakdown[key as keyof typeof atsScore.breakdown]}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      atsScore.breakdown[key as keyof typeof atsScore.breakdown] >= 80 ? 'bg-green-500' :
                      atsScore.breakdown[key as keyof typeof atsScore.breakdown] >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${atsScore.breakdown[key as keyof typeof atsScore.breakdown]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {atsScore.suggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Improvement Suggestions
              </h4>
              <ul className="space-y-2">
                {atsScore.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Found Keywords ({atsScore.keywordMatches.length})
              </h4>
              <div className="flex flex-wrap gap-1">
                {atsScore.keywordMatches.slice(0, 10).map((keyword) => (
                  <span key={keyword} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {keyword}
                  </span>
                ))}
                {atsScore.keywordMatches.length > 10 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{atsScore.keywordMatches.length - 10} more
                  </span>
                )}
              </div>
            </div>

            {atsScore.missingKeywords.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Suggested Keywords ({atsScore.missingKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {atsScore.missingKeywords.slice(0, 10).map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {keyword}
                    </span>
                  ))}
                  {atsScore.missingKeywords.length > 10 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{atsScore.missingKeywords.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ATS Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              ATS Optimization Tips
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use standard section headings like "Experience", "Education", "Skills"</li>
              <li>• Include keywords from job descriptions naturally in your content</li>
              <li>• Use simple, clean formatting without complex graphics or tables</li>
              <li>• Quantify achievements with specific numbers and percentages</li>
              <li>• Save and submit as PDF to preserve formatting</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScorePanel;