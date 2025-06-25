import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { CVSection, Template } from '../types/cv';
import { GripVertical, Trash2, Plus, MapPin, Save, Clock, HelpCircle, FileText } from 'lucide-react';

interface SectionEditorProps {
  sections: CVSection[];
  onSectionsChange: (sections: CVSection[]) => void;
  selectedTemplate: string;
  templates: Template[];
  lastSaved?: Date;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  sections,
  onSectionsChange,
  selectedTemplate,
  templates,
  lastSaved,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState<string>('main');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    // Update order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }));

    onSectionsChange(updatedSections);
  };

  const updateSection = (id: string, field: string, value: string) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    );
    onSectionsChange(updatedSections);
  };

  const deleteSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    onSectionsChange(updatedSections);
  };

  const getTemplatePlacements = (templateId: string) => {
    const placements = [
      { id: 'main', label: 'Main Content', description: 'Primary content area for experience and projects' },
    ];

    // Add template-specific placements
    if (templateId.includes('two-column') || templateId.includes('asymmetrical') || templateId.includes('hybrid')) {
      placements.push(
        { id: 'sidebar', label: 'Sidebar', description: 'Side column for skills, education, and certifications' },
        { id: 'left-column', label: 'Left Column', description: 'Left side content area' },
        { id: 'right-column', label: 'Right Column', description: 'Right side content area' }
      );
    }

    if (templateId.includes('triple') || templateId.includes('t-shaped')) {
      placements.push(
        { id: 'header', label: 'Header Section', description: 'Top banner area for summary or key information' },
        { id: 'middle-left', label: 'Middle Left', description: 'Left middle column for skills' },
        { id: 'middle-center', label: 'Middle Center', description: 'Center middle column for main content' },
        { id: 'middle-right', label: 'Middle Right', description: 'Right middle column for education' },
        { id: 'footer', label: 'Footer Section', description: 'Bottom area for additional information' }
      );
    }

    return placements;
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: CVSection = {
      id: `section-${Date.now()}`,
      type: 'custom',
      title: newSectionTitle.trim(),
      content: '',
      order: sections.length,
      required: false,
      placement: selectedPlacement,
    };

    onSectionsChange([...sections, newSection]);
    setNewSectionTitle('');
    setSelectedPlacement('main');
    setShowAddModal(false);
  };

  const templatePlacements = getTemplatePlacements(selectedTemplate);
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const getSectionTooltip = (section: CVSection) => {
    const tooltips: { [key: string]: string } = {
      'professional-summary': 'Brief overview of your experience and key qualifications (2-3 sentences)',
      'work-experience': 'Your professional work history with quantifiable achievements',
      'technical-skills': 'Programming languages, frameworks, tools, and technologies',
      'education': 'Academic qualifications, degrees, and relevant coursework',
      'projects': 'Personal or professional projects that demonstrate your skills',
      'achievements': 'Awards, certifications, publications, and notable accomplishments'
    };
    return tooltips[section.type] || 'Custom section content';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Edit Sections
            </h3>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Drag sections to reorder. Use markdown formatting for content.
              </div>
            </div>
          </div>
          {lastSaved && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          title="Add a new custom section to your resume"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Section
        </button>
      </div>

      {/* Template Layout Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">
              Current Template: {currentTemplate?.name}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {currentTemplate?.description}
            </p>
          </div>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-blue-600 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Template determines available section placements
            </div>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className={`space-y-3 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''}`}
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white border border-gray-200 rounded-lg p-4 space-y-3 transition-shadow ${
                        snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 ring-opacity-50' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <div 
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded flex-shrink-0"
                            title="Drag to reorder sections"
                          >
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                            className="font-medium text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded flex-1 min-w-0"
                            placeholder="Section title"
                          />
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {section.placement && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {templatePlacements.find(p => p.id === section.placement)?.label || section.placement}
                              </span>
                            )}
                            {section.required && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                            <div className="group relative">
                              <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {getSectionTooltip(section)}
                              </div>
                            </div>
                          </div>
                        </div>
                        {!section.required && (
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded flex-shrink-0 ml-2"
                            title="Delete this section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                          placeholder="Enter content in markdown format... Use **bold**, *italic*, ### headings, and • bullet points"
                          className="w-full h-24 sm:h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="group relative">
                            <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              Supports Markdown: **bold**, *italic*, ### headings, • bullets
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Add New Section</h4>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Add custom sections like Certifications, Languages, or Awards
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="e.g., Certifications, Languages, Awards"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placement in Template
                </label>
                <select
                  value={selectedPlacement}
                  onChange={(e) => setSelectedPlacement(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {templatePlacements.map((placement) => (
                    <option key={placement.id} value={placement.id}>
                      {placement.label} - {placement.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addSection}
                disabled={!newSectionTitle.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionEditor;