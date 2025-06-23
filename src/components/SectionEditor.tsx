import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { CVSection } from '../types/cv';
import { GripVertical, Trash2, Plus } from 'lucide-react';

interface SectionEditorProps {
  sections: CVSection[];
  onSectionsChange: (sections: CVSection[]) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  sections,
  onSectionsChange,
}) => {
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

  const addSection = () => {
    const newSection: CVSection = {
      id: `section-${Date.now()}`,
      type: 'custom',
      title: 'New Section',
      content: '',
      order: sections.length,
      required: false,
    };
    onSectionsChange([...sections, newSection]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Edit Sections</h3>
        <button
          onClick={addSection}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Section
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className={`space-y-4 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''}`}
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
                        <div className="flex items-center space-x-2">
                          <div 
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                          >
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                            className="font-medium text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
                          />
                          {section.required && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        {!section.required && (
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        placeholder="Enter content in markdown format..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SectionEditor;