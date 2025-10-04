import React, { useState } from 'react';
import { CheckCircle, Circle, Calendar, User, Briefcase, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  category: 'client' | 'business' | 'personal';
}

interface TasksPanelProps {
  tasks: Task[];
}

export const TasksPanel: React.FC<TasksPanelProps> = ({ tasks }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'client': return User;
      case 'business': return Briefcase;
      case 'personal': return Clock;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      return `Vencida hace ${Math.abs(diffInDays)} días`;
    } else if (diffInDays === 0) {
      return 'Vence hoy';
    } else if (diffInDays === 1) {
      return 'Vence mañana';
    } else {
      return `Vence en ${diffInDays} días`;
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const filters = [
    { id: 'pending' as const, label: 'Pendientes', count: tasks.filter(t => !t.completed).length },
    { id: 'completed' as const, label: 'Completadas', count: tasks.filter(t => t.completed).length },
    { id: 'all' as const, label: 'Todas', count: tasks.length }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Tareas</h3>
        <div className="flex space-x-2">
          {filters.map(filterOption => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${
                filter === filterOption.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredTasks.map((task) => {
          const CategoryIcon = getCategoryIcon(task.category);
          const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
          
          return (
            <div
              key={task.id}
              className={`p-4 rounded-lg border-l-4 transition-colors ${
                task.completed 
                  ? 'border-l-green-500 bg-green-50 opacity-75' 
                  : getPriorityColor(task.priority)
              }`}
            >
              <div className="flex items-start space-x-3">
                <button className="flex-shrink-0 mt-0.5">
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      task.completed ? 'text-green-800 line-through' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 capitalize">{task.category}</span>
                    </div>
                  </div>

                  <p className={`text-sm mb-3 ${
                    task.completed ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className={`text-xs ${
                        isOverdue 
                          ? 'text-red-600 font-medium' 
                          : task.completed 
                            ? 'text-green-600' 
                            : 'text-gray-500'
                      }`}>
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>

                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No hay tareas {filter === 'pending' ? 'pendientes' : filter === 'completed' ? 'completadas' : ''}</p>
        </div>
      )}
    </div>
  );
};