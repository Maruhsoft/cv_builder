import { marked } from 'marked';

export const parseMarkdown = (markdown: string): string => {
  return marked(markdown);
};

export const extractSectionsFromMarkdown = (markdown: string) => {
  const sections = [];
  const lines = markdown.split('\n');
  let currentSection = null;
  let currentContent = [];
  let order = 0;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: currentContent.join('\n').trim()
        });
      }
      currentSection = {
        id: `section-${Date.now()}-${order}`,
        type: line.slice(2).toLowerCase().replace(/\s+/g, '-'),
        title: line.slice(2),
        order: order++,
        required: ['contact', 'experience', 'education'].includes(
          line.slice(2).toLowerCase().replace(/\s+/g, '-')
        )
      };
      currentContent = [];
    } else if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: currentContent.join('\n').trim()
        });
      }
      currentSection = {
        id: `section-${Date.now()}-${order}`,
        type: line.slice(3).toLowerCase().replace(/\s+/g, '-'),
        title: line.slice(3),
        order: order++,
        required: ['contact', 'experience', 'education'].includes(
          line.slice(3).toLowerCase().replace(/\s+/g, '-')
        )
      };
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    sections.push({
      ...currentSection,
      content: currentContent.join('\n').trim()
    });
  }

  return sections;
};

export const sectionsToMarkdown = (sections: any[]): string => {
  return sections
    .sort((a, b) => a.order - b.order)
    .map(section => `## ${section.title}\n\n${section.content}`)
    .join('\n\n');
};