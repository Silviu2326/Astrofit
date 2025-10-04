import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Mail,
  Star,
  Download,
  Upload,
} from 'lucide-react';

interface CustomTemplate {
  id: string;
  name: string;
  description: string;
  blocks: any[];
  globalSettings: any;
  createdAt: string;
  updatedAt: string;
  category: string;
  favorite?: boolean;
  usageCount?: number;
}

interface TemplatesPersonalizadosProps {
  onEditTemplate: (template: any) => void;
}

export default function TemplatesPersonalizados({
  onEditTemplate,
}: TemplatesPersonalizadosProps) {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'usage'>('recent');

  // Cargar templates del localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('customEmailTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Templates de ejemplo
      const exampleTemplates: CustomTemplate[] = [
        {
          id: 'custom-1',
          name: 'Mi Plantilla de Bienvenida',
          description: 'Template personalizado para dar la bienvenida a nuevos clientes',
          category: 'bienvenida',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          favorite: true,
          usageCount: 15,
          blocks: [],
          globalSettings: {},
        },
        {
          id: 'custom-2',
          name: 'Promoción de Fin de Mes',
          description: 'Template para promociones mensuales recurrentes',
          category: 'promocion',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          favorite: false,
          usageCount: 8,
          blocks: [],
          globalSettings: {},
        },
        {
          id: 'custom-3',
          name: 'Newsletter Semanal',
          description: 'Diseño limpio para newsletter semanal',
          category: 'newsletter',
          createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          favorite: true,
          usageCount: 23,
          blocks: [],
          globalSettings: {},
        },
      ];
      setTemplates(exampleTemplates);
      localStorage.setItem(
        'customEmailTemplates',
        JSON.stringify(exampleTemplates)
      );
    }
  }, []);

  // Guardar en localStorage cuando cambien los templates
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('customEmailTemplates', JSON.stringify(templates));
    }
  }, [templates]);

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  const handleDuplicate = (template: CustomTemplate) => {
    const newTemplate: CustomTemplate = {
      ...template,
      id: `custom-${Date.now()}`,
      name: `${template.name} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
    };
    setTemplates([newTemplate, ...templates]);
  };

  const handleToggleFavorite = (id: string) => {
    setTemplates(
      templates.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    );
  };

  const handleExport = (template: CustomTemplate) => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${template.name.replace(/\s/g, '_')}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          const newTemplate: CustomTemplate = {
            ...imported,
            id: `custom-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setTemplates([newTemplate, ...templates]);
        } catch (error) {
          alert('Error al importar la plantilla. Verifica que el archivo sea válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        searchQuery === '' ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || template.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'usage':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'recent':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'bienvenida', label: 'Bienvenida' },
    { id: 'promocion', label: 'Promociones' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'evento', label: 'Eventos' },
    { id: 'otro', label: 'Otros' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Mis Plantillas Personalizadas
            </h2>
            <p className="text-gray-600">
              {templates.length} plantilla{templates.length !== 1 ? 's' : ''}{' '}
              guardada{templates.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Importar
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => onEditTemplate(null)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Nuevo Template
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Más recientes</option>
            <option value="name">Por nombre</option>
            <option value="usage">Más usadas</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || filterCategory !== 'all'
              ? 'No se encontraron plantillas'
              : 'Aún no tienes plantillas personalizadas'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterCategory !== 'all'
              ? 'Intenta con otros términos de búsqueda'
              : 'Crea tu primera plantilla desde el editor o usa una de la biblioteca'}
          </p>
          <button
            onClick={() => onEditTemplate(null)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Crear Nueva Plantilla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    {template.favorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.description}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleFavorite(template.id)}
                  className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Star
                    className={`w-5 h-5 ${
                      template.favorite ? 'fill-current text-yellow-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(template.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {template.usageCount || 0} usos
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {categories.find((c) => c.id === template.category)?.label ||
                    template.category}
                </span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onEditTemplate(template)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDuplicate(template)}
                    className="flex-1 flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Duplicar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExport(template)}
                    className="flex-1 flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Exportar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="flex-1 flex items-center justify-center p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      {templates.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {templates.length}
            </div>
            <div className="text-sm text-gray-600">Templates Totales</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {templates.filter((t) => t.favorite).length}
            </div>
            <div className="text-sm text-gray-600">Favoritos</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {templates.reduce((acc, t) => acc + (t.usageCount || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Usos Totales</div>
          </div>
        </div>
      )}
    </div>
  );
}
