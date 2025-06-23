import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

const SampleMarkdown: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sampleMarkdown = `## Professional Summary
Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using modern technologies. Passionate about clean code, user experience, and continuous learning.

## Technical Skills
- **Frontend:** React, TypeScript, Vue.js, HTML5, CSS3, Sass
- **Backend:** Node.js, Python, Java, PHP
- **Databases:** PostgreSQL, MongoDB, Redis
- **Cloud:** AWS, Google Cloud, Docker, Kubernetes
- **Tools:** Git, Jenkins, Webpack, Jest

## Work Experience

### Senior Software Developer | TechCorp Inc.
*January 2021 - Present*
- Led development of microservices architecture serving 1M+ users
- Improved application performance by 40% through optimization
- Mentored 3 junior developers and conducted code reviews
- Implemented CI/CD pipelines reducing deployment time by 60%

### Software Developer | StartupXYZ
*June 2019 - December 2020*
- Built responsive web applications using React and Node.js
- Collaborated with UX/UI designers to implement pixel-perfect designs
- Integrated third-party APIs and payment gateways
- Participated in agile development processes

## Education

### Bachelor of Science in Computer Science
*University of Technology | 2015 - 2019*
- Graduated Magna Cum Laude (GPA: 3.8/4.0)
- Relevant Coursework: Data Structures, Algorithms, Software Engineering

## Projects

### E-Commerce Platform
*React, Node.js, PostgreSQL*
- Built a full-stack e-commerce platform with real-time inventory management
- Implemented secure payment processing and user authentication
- **[GitHub](https://github.com/yourusername/ecommerce-platform)**

### Task Management App
*Vue.js, Firebase*
- Developed a collaborative task management application
- Features include real-time updates, file sharing, and team collaboration
- **[Live Demo](https://taskapp-demo.com)**

## Certifications
- AWS Certified Solutions Architect (2023)
- Google Cloud Professional Developer (2022)
- MongoDB Certified Developer (2021)`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Sample Markdown Format
        </h3>
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white rounded border p-4 max-h-96 overflow-y-auto">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {sampleMarkdown}
        </pre>
      </div>
      
      <div className="text-sm text-gray-600">
        <p className="mb-2"><strong>Tips:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use ## for section headings</li>
          <li>Use ### for subsections (like job titles)</li>
          <li>Use **bold** for emphasis</li>
          <li>Use *italics* for dates and locations</li>
          <li>Use - for bullet points</li>
          <li>Use [Link Text](URL) for links</li>
        </ul>
      </div>
    </div>
  );
};

export default SampleMarkdown;