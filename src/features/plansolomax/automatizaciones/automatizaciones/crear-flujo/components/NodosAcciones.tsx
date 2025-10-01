import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Bell, Bot, Clock, Calendar, Webhook, Code, Settings, Search } from 'lucide-react';
import { Input } from '../../../../../../components/ui/input';
import { Badge } from '../../../../../../components/ui/badge';

const actionCategories = [
  {
    name: 'Comunicación',
    icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    actions: [
      { name: 'Enviar Email', icon: <Mail className="w-4 h-4" />, description: 'Envía un correo electrónico personalizado', type: 'email', tags: ['básico'] },
      { name: 'Enviar SMS', icon: <MessageSquare className="w-4 h-4" />, description: 'Envía un mensaje de texto', type: 'sms', tags: ['premium'] },
      { name: 'Notificación Push', icon: <Bell className="w-4 h-4" />, description: 'Envía una notificación push', type: 'push', tags: ['básico'] },
      { name: 'WhatsApp', icon: <Bot className="w-4 h-4" />, description: 'Envía mensaje por WhatsApp', type: 'whatsapp', tags: ['premium'] },
    ],
  },
  {
    name: 'Tiempo',
    icon: <Clock className="w-5 h-5 text-orange-500" />,
    color: 'orange',
    actions: [
      { name: 'Esperar', icon: <Clock className="w-4 h-4" />, description: 'Añade un retraso al flujo', type: 'delay', tags: ['básico'] },
      { name: 'Programar', icon: <Calendar className="w-4 h-4" />, description: 'Programa una acción para más tarde', type: 'schedule', tags: ['premium'] },
    ],
  },
  {
    name: 'Integración',
    icon: <Webhook className="w-5 h-5 text-blue-500" />,
    color: 'blue',
    actions: [
      { name: 'Webhook', icon: <Webhook className="w-4 h-4" />, description: 'Envía datos a una URL externa', type: 'webhook', tags: ['avanzado'] },
      { name: 'API Call', icon: <Code className="w-4 h-4" />, description: 'Realiza una llamada API personalizada', type: 'api', tags: ['avanzado'] },
    ],
  },
];

const ActionCard = ({ action, categoryColor, onDragStart }) => {
  const [isDragging, setIsDragging] = useState(false);

  const colorMap = {
    emerald: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-blue-500 to-blue-600',
  };

  const textColorMap = {
    emerald: 'text-emerald-600',
    orange: 'text-orange-600',
    blue: 'text-blue-600',
  };

  return (
    <motion.div
      className={`relative p-4 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm cursor-grab hover:shadow-xl transition-all duration-300 overflow-hidden ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      onDragStart={(event) => {
        onDragStart(event, 'action', action.name, action.type);
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
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${colorMap[categoryColor] || colorMap.emerald}`} />

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg bg-gray-50 ${textColorMap[categoryColor] || textColorMap.emerald}`}>
              {action.icon}
            </div>
            <h5 className="font-semibold text-gray-800 leading-tight">{action.name}</h5>
          </div>
          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorMap[categoryColor] || colorMap.emerald}`} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>

        {/* Tags and type */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            {action.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <span className={`text-xs font-medium ${textColorMap[categoryColor] || textColorMap.emerald} bg-gray-50 px-2 py-1 rounded-md`}>
            {action.type}
          </span>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};

const NodosAcciones: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string, type: string) => {
    const nodeData = { nodeType, label, type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredCategories = actionCategories.map(category => ({
    ...category,
    actions: category.actions.filter(action =>
      action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.actions.length > 0);

  return (
    <div className="space-y-4">
      {/* Header with search */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Acciones</h3>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar acciones..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
                {category.actions.length}
              </Badge>
            </div>

            {/* Action Cards */}
            <div className="space-y-2">
              {category.actions.map((action, actionIndex) => (
                <motion.div
                  key={action.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (actionIndex * 0.05) }}
                >
                  <ActionCard
                    action={action}
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
          <p>No se encontraron acciones</p>
        </motion.div>
      )}
    </div>
  );
};

export default NodosAcciones;
