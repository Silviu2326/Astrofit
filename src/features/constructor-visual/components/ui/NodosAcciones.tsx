import React, { useState } from 'react';
import { Mail, MessageSquare, Bell, Phone, Bot, Tag, Star, UserPlus, List, BarChart2, Clock, Calendar, Webhook, Code, Zap, BarChart, CheckSquare, User, Clock4, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

const categories = [
  {
    name: 'Comunicación',
    icon: <MessageSquare className="text-blue-500" />,
    color: 'blue',
    actions: [
      { name: 'Email', icon: <Mail />, description: 'Enviar un correo electrónico', tags: ['básico'] },
      { name: 'SMS', icon: <MessageSquare />, description: 'Enviar un mensaje de texto', tags: ['premium'] },
      { name: 'Push Notification', icon: <Bell />, description: 'Enviar una notificación push', tags: ['básico'] },
      { name: 'WhatsApp', icon: <Bot />, description: 'Enviar un mensaje de WhatsApp', tags: ['premium'] },
    ],
  },
  // ... (rest of the categories)
];

const NodosAcciones = ({ collapsed, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredCategories = categories.map(category => ({
    ...category,
    actions: category.actions.filter(action =>
      action.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.actions.length > 0);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="text-lg font-semibold">Acciones</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      {!collapsed && (
        <>
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Buscar acciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <svg
              className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => setActiveCategory(null)}>Todos</Button>
            {categories.map(category => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.name)}
              >
                {category.icon}
              </Button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredCategories
              .filter(category => !activeCategory || activeCategory === category.name)
              .map(category => (
                <div key={category.name} className="mb-4">
                  <h3 className={`text-sm font-semibold text-${category.color}-500 flex items-center mb-2`}>
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.actions.map(action => (
                      <div
                        key={action.name}
                        className="bg-white p-2 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-500 transition-all duration-200 cursor-pointer"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/reactflow', 'action');
                          e.dataTransfer.setData('action-name', action.name);
                        }}
                      >
                        <div className="flex items-center mb-1">
                          {action.icon}
                          <span className="text-xs font-semibold ml-2">{action.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{action.description}</p>
                        <div className="flex space-x-1">
                          {action.tags.map(tag => (
                            <span
                              key={tag}
                              className={`text-xs px-1.5 py-0.5 rounded-full ${
                                tag === 'premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NodosAcciones;
