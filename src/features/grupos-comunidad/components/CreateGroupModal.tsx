import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Globe, Lock, EyeOff, Image as ImageIcon } from 'lucide-react';
import { CreateGroupData, GroupCategory, GroupRule } from '../types';

interface CreateGroupModalProps {
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreateGroupData>({
    name: '',
    description: '',
    category: 'technology',
    privacy: 'public',
    rules: [],
    tags: [],
  });

  const [newRule, setNewRule] = useState({ title: '', description: '' });
  const [newTag, setNewTag] = useState('');

  const categories: { value: GroupCategory; label: string; icon: string }[] = [
    { value: 'technology', label: 'Tecnología', icon: '💻' },
    { value: 'gaming', label: 'Gaming', icon: '🎮' },
    { value: 'art', label: 'Arte', icon: '🎨' },
    { value: 'music', label: 'Música', icon: '🎵' },
    { value: 'sports', label: 'Deportes', icon: '⚽' },
    { value: 'education', label: 'Educación', icon: '📚' },
    { value: 'business', label: 'Negocios', icon: '💼' },
    { value: 'lifestyle', label: 'Estilo de vida', icon: '🌟' },
    { value: 'entertainment', label: 'Entretenimiento', icon: '🎬' },
    { value: 'other', label: 'Otro', icon: '📌' },
  ];

  const privacyOptions = [
    {
      value: 'public',
      label: 'Público',
      icon: Globe,
      description: 'Cualquiera puede ver el grupo y unirse',
    },
    {
      value: 'private',
      label: 'Privado',
      icon: Lock,
      description: 'Solo miembros pueden ver el contenido',
    },
    {
      value: 'secret',
      label: 'Secreto',
      icon: EyeOff,
      description: 'El grupo no aparece en búsquedas',
    },
  ];

  const handleAddRule = () => {
    if (newRule.title.trim() && newRule.description.trim()) {
      setFormData({
        ...formData,
        rules: [...formData.rules, { ...newRule, order: formData.rules.length + 1 }],
      });
      setNewRule({ title: '', description: '' });
    }
  };

  const handleRemoveRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index),
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating group:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
          <h2 className="text-2xl font-bold text-white">Crear Nuevo Grupo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen de Portada
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click para subir imagen de portada</p>
              <p className="text-sm text-gray-400">Recomendado: 800x400px</p>
            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Icono del Grupo (Emoji)
            </label>
            <input
              type="text"
              value={formData.icon || ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🎯"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-2xl text-center"
              maxLength={2}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Grupo *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Desarrolladores Web"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe de qué trata tu grupo..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.category === cat.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-sm font-medium">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Privacidad *
            </label>
            <div className="space-y-3">
              {privacyOptions.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, privacy: option.value as any })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.privacy === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Etiquetas
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Añadir etiqueta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm flex items-center gap-2"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reglas del Grupo
            </label>
            <div className="space-y-3 mb-3">
              {formData.rules.map((rule, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {index + 1}. {rule.title}
                      </div>
                      <div className="text-sm text-gray-600">{rule.description}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRule(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl space-y-3">
              <input
                type="text"
                value={newRule.title}
                onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                placeholder="Título de la regla..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                placeholder="Descripción de la regla..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Añadir Regla
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Crear Grupo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
