import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  StickyNote, 
  Plus, 
  Search, 
  Filter, 
  Tag, 
  User, 
  Clock, 
  Pin,
  Edit3,
  Trash2,
  Share2,
  Heart,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Calendar,
  X,
  Save,
  MoreVertical
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'nutritionist' | 'client' | 'trainer';
  };
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'general' | 'recipe' | 'goal' | 'feedback' | 'reminder';
  isPinned: boolean;
  isShared: boolean;
  attachments?: {
    id: string;
    name: string;
    type: 'image' | 'document' | 'link';
    url: string;
  }[];
  comments?: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: Date;
  }[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

interface NotesSystemProps {
  notes: Note[];
  onNoteCreate: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNoteUpdate: (id: string, updates: Partial<Note>) => void;
  onNoteDelete: (id: string) => void;
  onNoteShare: (id: string, users: string[]) => void;
  className?: string;
}

type FilterType = 'all' | 'pinned' | 'shared' | 'mine' | 'high-priority' | 'recent';
type SortType = 'newest' | 'oldest' | 'priority' | 'title';

export const NotesSystem: React.FC<NotesSystemProps> = ({
  notes,
  onNoteCreate,
  onNoteUpdate,
  onNoteDelete,
  onNoteShare,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock de notas para demo
  const mockNotes: Note[] = useMemo(() => [
    {
      id: '1',
      title: 'Ajustes en la dieta de María',
      content: 'María ha reportado que se siente más cansada por las tardes. Considerar aumentar los carbohidratos en el almuerzo y añadir un snack pre-entrenamiento.',
      author: {
        id: 'nutritionist-1',
        name: 'Dr. Ana García',
        avatar: '/api/placeholder/40/40',
        role: 'nutritionist'
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ['ajustes', 'fatiga', 'carbohidratos'],
      priority: 'high',
      type: 'feedback',
      isPinned: true,
      isShared: true,
      comments: [
        {
          id: 'c1',
          author: {
            id: 'client-1',
            name: 'María López',
            avatar: '/api/placeholder/32/32'
          },
          content: 'Gracias por el seguimiento. Noto mejoría con el snack de media tarde.',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
        }
      ],
      reactions: [
        { emoji: '👍', count: 2, users: ['nutritionist-1', 'client-1'] },
        { emoji: '💪', count: 1, users: ['client-1'] }
      ]
    },
    {
      id: '2',
      title: 'Nueva receta: Bowl de quinoa',
      content: 'Receta añadida al catálogo. Alta en proteínas (25g) y fibra. Perfecta para post-entrenamiento. Tiempo de preparación: 15 min.',
      author: {
        id: 'nutritionist-1',
        name: 'Dr. Ana García',
        avatar: '/api/placeholder/40/40',
        role: 'nutritionist'
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ['receta', 'proteína', 'post-entrenamiento'],
      priority: 'medium',
      type: 'recipe',
      isPinned: false,
      isShared: false,
      reactions: [
        { emoji: '❤️', count: 3, users: ['nutritionist-1', 'client-1', 'client-2'] }
      ]
    },
    {
      id: '3',
      title: 'Recordatorio: Revisión semanal',
      content: 'Revisar progreso de todos los clientes esta semana. Enfocarse en adherencia y ajustes necesarios.',
      author: {
        id: 'nutritionist-1',
        name: 'Dr. Ana García',
        avatar: '/api/placeholder/40/40',
        role: 'nutritionist'
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ['recordatorio', 'revisión', 'semanal'],
      priority: 'urgent',
      type: 'reminder',
      isPinned: true,
      isShared: false
    }
  ], []);

  const filteredNotes = useMemo(() => {
    let filtered = mockNotes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = activeFilter === 'all' ||
        (activeFilter === 'pinned' && note.isPinned) ||
        (activeFilter === 'shared' && note.isShared) ||
        (activeFilter === 'mine' && note.author.role === 'nutritionist') ||
        (activeFilter === 'high-priority' && ['high', 'urgent'].includes(note.priority)) ||
        (activeFilter === 'recent' && (Date.now() - note.createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000);

      return matchesSearch && matchesFilter;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockNotes, searchTerm, activeFilter, sortBy]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'general': return <StickyNote className="w-4 h-4" />;
      case 'recipe': return <Target className="w-4 h-4" />;
      case 'goal': return <TrendingUp className="w-4 h-4" />;
      case 'feedback': return <MessageCircle className="w-4 h-4" />;
      case 'reminder': return <AlertCircle className="w-4 h-4" />;
      default: return <StickyNote className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'text-blue-600 bg-blue-100';
      case 'recipe': return 'text-green-600 bg-green-100';
      case 'goal': return 'text-purple-600 bg-purple-100';
      case 'feedback': return 'text-orange-600 bg-orange-100';
      case 'reminder': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const NoteCard: React.FC<{ note: Note; compact?: boolean }> = ({ 
    note, 
    compact = false 
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedNote(note)}
      className={`
        bg-white rounded-2xl shadow-lg border border-gray-200 cursor-pointer transition-all duration-300
        ${note.isPinned ? 'ring-2 ring-yellow-400' : ''}
        ${compact ? 'p-4' : 'p-6'}
        hover:shadow-xl
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {note.isPinned && <Pin className="w-4 h-4 text-yellow-500" />}
            <h3 className="font-bold text-gray-900 truncate">{note.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {note.updatedAt.toLocaleDateString('es-ES')}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {note.author.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(note.priority)}`}>
            {note.priority}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {note.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {note.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
        {note.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{note.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTypeColor(note.type)}`}>
            {getTypeIcon(note.type)}
            <span className="capitalize">{note.type}</span>
          </div>
          {note.isShared && (
            <div className="flex items-center gap-1 text-blue-600 text-xs">
              <Share2 className="w-3 h-3" />
              <span>Compartida</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {note.reactions?.map(reaction => (
            <button
              key={reaction.emoji}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
            >
              <span>{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </button>
          ))}
          {note.comments && note.comments.length > 0 && (
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MessageCircle className="w-3 h-3" />
              <span>{note.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const CreateNoteModal: React.FC = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      tags: [] as string[],
      priority: 'medium' as Note['priority'],
      type: 'general' as Note['type'],
      isPinned: false,
      isShared: false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onNoteCreate({
        ...formData,
        author: {
          id: 'nutritionist-1',
          name: 'Dr. Ana García',
          avatar: '/api/placeholder/40/40',
          role: 'nutritionist'
        }
      });
      setShowCreateModal(false);
      setFormData({
        title: '',
        content: '',
        tags: [],
        priority: 'medium',
        type: 'general',
        isPinned: false,
        isShared: false
      });
    };

    return (
      <AnimatePresence>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Nueva Nota</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Título de la nota..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                  placeholder="Escribe tu nota aquí..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Note['priority'] }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Note['type'] }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="recipe">Receta</option>
                    <option value="goal">Objetivo</option>
                    <option value="feedback">Feedback</option>
                    <option value="reminder">Recordatorio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (separados por comas)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="nutrición, ajustes, cliente..."
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Fijar nota</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isShared}
                    onChange={(e) => setFormData(prev => ({ ...prev, isShared: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Compartir</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Crear Nota
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sistema de Notas</h2>
          <p className="text-gray-600">Organiza y colabora en notas nutricionales</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtros */}
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as FilterType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="pinned">Fijadas</option>
            <option value="shared">Compartidas</option>
            <option value="mine">Mías</option>
            <option value="high-priority">Alta prioridad</option>
            <option value="recent">Recientes</option>
          </select>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="priority">Prioridad</option>
            <option value="title">Título</option>
          </select>

          {/* Vista */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Crear nota */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Nota
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <StickyNote className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{mockNotes.length}</div>
              <div className="text-sm text-gray-600">Total notas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Pin className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockNotes.filter(n => n.isPinned).length}
              </div>
              <div className="text-sm text-gray-600">Fijadas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Share2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockNotes.filter(n => n.isShared).length}
              </div>
              <div className="text-sm text-gray-600">Compartidas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockNotes.filter(n => ['high', 'urgent'].includes(n.priority)).length}
              </div>
              <div className="text-sm text-gray-600">Alta prioridad</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de notas */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* Estado vacío */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <StickyNote className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron notas</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros o crear una nueva nota
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Crear primera nota
          </button>
        </motion.div>
      )}

      {/* Modal de crear nota */}
      {showCreateModal && <CreateNoteModal />}
    </div>
  );
};


