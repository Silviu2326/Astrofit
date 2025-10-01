import React, { useState } from 'react';
import { Mail, User, Clock, ShoppingCart, MousePointerClick, Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card';
import { Input } from '../../../../../../components/ui/input';
import { Badge } from '../../../../../../components/ui/badge';

const triggerCategories = [
  {
    name: 'Email',
    icon: <Mail className="w-6 h-6 text-blue-500" />,
    color: 'blue',
    triggers: [
      { name: 'Nuevo Email', description: 'Cuando se recibe un nuevo email.', type: 'email-new' },
      { name: 'Respuesta de Email', description: 'Cuando un cliente responde a un email.', type: 'email-reply' },
      { name: 'Apertura de Email', description: 'Cuando un cliente abre un email.', type: 'email-open' },
    ],
  },
  {
    name: 'Cliente',
    icon: <User className="w-6 h-6 text-green-500" />,
    color: 'green',
    triggers: [
      { name: 'Nuevo Registro', description: 'Cuando un nuevo cliente se registra.', type: 'client-new' },
      { name: 'Actualización de Perfil', description: 'Cuando un cliente actualiza su perfil.', type: 'client-update' },
      { name: 'Inactividad', description: 'Cuando un cliente ha estado inactivo.', type: 'client-inactive' },
    ],
  },
  {
    name: 'Tiempo',
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
    color: 'yellow',
    triggers: [
      { name: 'Fecha Específica', description: 'En una fecha y hora específicas.', type: 'time-date' },
      { name: 'Recurrente', description: 'Se activa recurrentemente.', type: 'time-recurring' },
      { name: 'Después de X días', description: 'Después de un número de días.', type: 'time-delay' },
    ],
  },
  {
    name: 'Transacciones',
    icon: <ShoppingCart className="w-6 h-6 text-red-500" />,
    color: 'red',
    triggers: [
      { name: 'Nueva Compra', description: 'Cuando se realiza una nueva compra.', type: 'tx-new' },
      { name: 'Pago Fallido', description: 'Cuando un pago falla.', type: 'tx-failed' },
      { name: 'Reembolso', description: 'Cuando se procesa un reembolso.', type: 'tx-refund' },
    ],
  },
  {
    name: 'Comportamiento',
    icon: <MousePointerClick className="w-6 h-6 text-purple-500" />,
    color: 'purple',
    triggers: [
      { name: 'Visita a Página', description: 'Cuando un cliente visita una página.', type: 'behavior-visit' },
      { name: 'Descarga', description: 'Cuando un cliente descarga un archivo.', type: 'behavior-download' },
      { name: 'Click en Link', description: 'Cuando un cliente hace click en un enlace.', type: 'behavior-click' },
    ],
  },
  {
    name: 'Eventos Personalizados',
    icon: <Zap className="w-6 h-6 text-indigo-500" />,
    color: 'indigo',
    triggers: [
      { name: 'Evento Personalizado', description: 'Disparador basado en un evento.', type: 'custom-event' },
    ],
  },
];

const TriggerCard = ({ trigger, categoryColor, onDragStart }) => {
  const [isDragging, setIsDragging] = useState(false);

  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const textColorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
  };

  return (
    <motion.div
      className={`relative p-4 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm cursor-grab hover:shadow-xl transition-all duration-300 overflow-hidden ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      onDragStart={(event) => {
        onDragStart(event, 'trigger', trigger.name, trigger.type);
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      draggable
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Gradient border */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${colorMap[categoryColor] || colorMap.blue}`} />

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-gray-800 leading-tight">{trigger.name}</h5>
          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorMap[categoryColor] || colorMap.blue}`} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{trigger.description}</p>

        {/* Type indicator */}
        <div className="flex items-center justify-between pt-2">
          <span className={`text-xs font-medium ${textColorMap[categoryColor] || textColorMap.blue} bg-gray-50 px-2 py-1 rounded-md`}>
            {trigger.type}
          </span>
          <div className="w-4 h-4 opacity-30 hover:opacity-60 transition-opacity">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M13 7L9 11L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};

const NodosDisparadores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string, type: string) => {
    const nodeData = { nodeType, label, type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredCategories = triggerCategories.map(category => ({
    ...category,
    triggers: category.triggers.filter(trigger =>
      trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trigger.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.triggers.length > 0);

  return (
    <div className="space-y-4">
      {/* Header with search */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Disparadores</h3>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar disparadores..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-white shadow-sm">
                  {category.icon}
                </div>
                <h4 className="font-semibold text-gray-800">{category.name}</h4>
              </div>
              <Badge variant="secondary" className="bg-white/80 text-gray-600 border-gray-200">
                {category.triggers.length}
              </Badge>
            </div>

            {/* Trigger Cards */}
            <div className="space-y-2">
              {category.triggers.map((trigger, triggerIndex) => (
                <motion.div
                  key={trigger.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (triggerIndex * 0.05) }}
                >
                  <TriggerCard
                    trigger={trigger}
                    categoryColor={category.color}
                    onDragStart={onDragStart}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No se encontraron disparadores</p>
        </motion.div>
      )}
    </div>
  );
};

export default NodosDisparadores;
