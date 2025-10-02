import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Video, FileText, CheckSquare, Download, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Lesson } from '../types';

interface LessonListProps {
  lessons: Lesson[];
  onReorder: (lessons: Lesson[]) => void;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
  onTogglePublish: (lessonId: string) => void;
}

const LessonItem: React.FC<{
  lesson: Lesson;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}> = ({ lesson, onEdit, onDelete, onTogglePublish }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'texto':
        return <FileText className="w-5 h-5 text-purple-500" />;
      case 'quiz':
        return <CheckSquare className="w-5 h-5 text-orange-500" />;
      case 'descargable':
        return <Download className="w-5 h-5 text-green-500" />;
    }
  };

  const getTypeBadgeColor = () => {
    switch (lesson.type) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'texto':
        return 'bg-purple-100 text-purple-800';
      case 'quiz':
        return 'bg-orange-100 text-orange-800';
      case 'descargable':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        <div className="flex-shrink-0">
          {getTypeIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {lesson.title}
            </h3>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeBadgeColor()}`}>
              {lesson.type}
            </span>
            {!lesson.isPublished && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                Borrador
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
          {lesson.duration && (
            <span className="text-xs text-gray-400 mt-1 inline-block">
              {lesson.duration} min
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePublish}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title={lesson.isPublished ? 'Despublicar' : 'Publicar'}
          >
            {lesson.isPublished ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onReorder,
  onEdit,
  onDelete,
  onTogglePublish,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = lessons.findIndex((lesson) => lesson.id === active.id);
      const newIndex = lessons.findIndex((lesson) => lesson.id === over.id);

      const newLessons = [...lessons];
      const [movedLesson] = newLessons.splice(oldIndex, 1);
      newLessons.splice(newIndex, 0, movedLesson);

      // Actualizar el orden
      const reorderedLessons = newLessons.map((lesson, index) => ({
        ...lesson,
        order: index,
      }));

      onReorder(reorderedLessons);
    }
  };

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No hay lecciones</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza creando tu primera lección
        </p>
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lessons.map(l => l.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              onEdit={() => onEdit(lesson)}
              onDelete={() => onDelete(lesson.id)}
              onTogglePublish={() => onTogglePublish(lesson.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
