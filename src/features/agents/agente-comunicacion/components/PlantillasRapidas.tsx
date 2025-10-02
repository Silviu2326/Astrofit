
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Clock, Search, Tag } from 'lucide-react';
import { agenteComunicacionApi, MessageTemplate } from '../agenteComunicacionApi';

interface PlantillasRapidasProps {
  onSeleccionarTemplate?: (contenido: string) => void;
}

interface TemplateExtended extends MessageTemplate {
  tipo: string;
  ocasion: string;
  tasaApertura: number;
  ultimoUso: string;
}

const PlantillasRapidas: React.FC<PlantillasRapidasProps> = ({ onSeleccionarTemplate }) => {
  const [templates, setTemplates] = useState<TemplateExtended[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateExtended | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const welcome = await agenteComunicacionApi.getTemplate('welcome');
        const sessionReminder = await agenteComunicacionApi.getTemplate('session_reminder');
        const motivational = await agenteComunicacionApi.getTemplate('motivational');

        const extendedTemplates: TemplateExtended[] = [
          { ...welcome, tipo: 'Bienvenida', ocasion: 'Nuevo cliente', tasaApertura: 85.3, ultimoUso: 'Hace 2 días' },
          { ...sessionReminder, tipo: 'Recordatorio', ocasion: 'Sesión próxima', tasaApertura: 92.1, ultimoUso: 'Hace 1 hora' },
          { ...motivational, tipo: 'Motivación', ocasion: 'Progreso semanal', tasaApertura: 78.6, ultimoUso: 'Hace 3 días' },
          {
            id: 'recovery',
            name: 'Recuperación de Cliente',
            content: '¡Hola {{nombre}}! 😊 Te extrañamos en el gym. Tu progreso es importante y estamos aquí para apoyarte. ¿Qué te parece retomar esta semana? Tenemos horarios especiales que pueden funcionar mejor para ti.',
            tone: 'warm',
            tipo: 'Recuperación',
            ocasion: 'Cliente inactivo',
            tasaApertura: 65.4,
            ultimoUso: 'Hace 5 días'
          },
          {
            id: 'congratulations',
            name: 'Felicitación por Logro',
            content: '¡Felicidades {{nombre}}! 🎉 Has alcanzado {{objetivo}}. Esto demuestra tu dedicación y esfuerzo. ¡Sigue así, campeón/a! El siguiente nivel te está esperando.',
            tone: 'motivational',
            tipo: 'Felicitación',
            ocasion: 'Meta alcanzada',
            tasaApertura: 88.7,
            ultimoUso: 'Ayer'
          },
          {
            id: 'followup',
            name: 'Seguimiento Post-Sesión',
            content: 'Hola {{nombre}}, ¿cómo te sientes después de la sesión de hoy? Espero que hayas disfrutado el entrenamiento. Recuerda hidratarte bien y descansar. ¡Nos vemos en la próxima!',
            tone: 'warm',
            tipo: 'Seguimiento',
            ocasion: 'Post-sesión',
            tasaApertura: 73.2,
            ultimoUso: 'Hace 4 horas'
          }
        ];

        setTemplates(extendedTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleSelectTemplate = (template: TemplateExtended) => {
    setSelectedTemplate(template);
    if (onSeleccionarTemplate) {
      onSeleccionarTemplate(template.content);
    }
  };

  const templatesFiltrados = templates.filter(t => {
    const matchBusqueda = t.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                          t.content.toLowerCase().includes(busqueda.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
    return matchBusqueda && matchTipo;
  });

  const tipos = ['todos', ...Array.from(new Set(templates.map(t => t.tipo)))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <FileText className="w-6 h-6" />
          </div>
          Biblioteca de Templates
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar templates..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80"
            />
          </div>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80"
          >
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo === 'todos' ? 'Todos los tipos' : tipo}
              </option>
            ))}
          </select>
        </div>

        {/* Grid de templates */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Cargando templates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {templatesFiltrados.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => handleSelectTemplate(template)}
                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                  selectedTemplate?.id === template.id
                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-rose-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                }`}
              >
                {/* Header del template */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-gray-800 flex-1">{template.name}</h4>
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-full">
                      {template.tipo}
                    </span>
                  </div>
                </div>

                {/* Preview del contenido */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.content}</p>

                {/* Métricas */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-semibold">{template.tasaApertura}%</span>
                    <span className="text-gray-500">apertura</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{template.ultimoUso}</span>
                  </div>
                </div>

                {/* Badge de ocasión */}
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Tag className="w-3 h-3 text-orange-500" />
                  <span className="text-gray-600">{template.ocasion}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {templatesFiltrados.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron templates que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlantillasRapidas;
