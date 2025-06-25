import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

const SampleMarkdown: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sampleMarkdown = `## Summary

Software Engineer with 5+ years building scalable systems. Expert in distributed systems, algorithms, and system design. Led teams of 8+ engineers delivering products used by millions.

## Experience

### Senior Software Engineer | Meta

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
- **Technologies:** Python, AWS, Spark, DynamoDB, Docker

## Technical Skills

- **Languages:** Python, Java, C++, JavaScript, Go, SQL  
- **Systems:** AWS, GCP, Kubernetes, Docker, Redis, Kafka, Elasticsearch  
- **Databases:** PostgreSQL, MongoDB, DynamoDB, BigQuery  
- **ML/AI:** TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy  
- **Tools:** Git, Jenkins, Terraform, Prometheus, Grafana

## Projects

### Distributed Task Scheduler

**Technologies:** Python, Kubernetes, Redis  

- Built fault-tolerant task scheduling system handling 1M+ jobs/day  
- Implemented auto-scaling reducing infrastructure costs by 30%  
- **GitHub:** [github.com/username/task-scheduler](https://github.com/username/task-scheduler)

### Real-time Chat Application

**Technologies:** Node.js, WebSocket, MongoDB  

- Developed chat platform supporting 10K+ concurrent users  
- Implemented end-to-end encryption and message persistence  
- **Live Demo:** [chat-app-demo.com](https://chat-app-demo.com)

## Education

### Master of Science in Computer Science | Stanford University

**Duration:** 2017 – 2019  
**GPA:** 3.9/4.0  

- **Specialization:** Distributed Systems and Machine Learning  
- **Relevant Coursework:** Advanced Algorithms, System Design, ML Theory

### Bachelor of Science in Computer Engineering | UC Berkeley

**Duration:** 2013 – 2017  
**GPA:** 3.8/4.0  
**Honors:** Magna Cum Laude

## Achievements

- **Patents:** 2 US patents in distributed systems and caching technologies  
- **Publications:** 3 peer-reviewed papers in top-tier conferences (SOSP, OSDI)  
- **Awards:** Employee of the Year 2023, Hackathon Winner (Best Technical Innovation)  
- **Certifications:** AWS Solutions Architect Professional, Google Cloud Professional`;

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
          Google-Standard Resume Format
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
        <p className="mb-2"><strong>Proper Markdown Formatting Tips:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use <code>-</code> or <code>*</code> for bullet points (not •)</li>
          <li>Add blank lines after headings (<code>### Heading</code>)</li>
          <li>Use <code>**bold**</code> for emphasis and labels</li>
          <li>Separate sections with blank lines for better readability</li>
          <li>Use consistent formatting for dates, GPA, and metadata</li>
          <li>Include quantifiable metrics with numbers and percentages</li>
          <li>Use proper link formatting: <code>[text](url)</code></li>
        </ul>
      </div>
    </div>
  );
};

export default SampleMarkdown;
