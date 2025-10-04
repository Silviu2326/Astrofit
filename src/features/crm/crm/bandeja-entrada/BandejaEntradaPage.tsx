import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Mail, CheckSquare, Bell, Activity } from 'lucide-react';
import { MessageCenter } from './components/MessageCenter';
import { TasksPanel } from './components/TasksPanel';
import { NotificationsPanel } from './components/NotificationsPanel';
import { bandejaEntradaApi } from './bandejaEntradaApi';

export const BandejaEntradaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'tasks' | 'notifications'>('messages');
  const [messages] = useState(bandejaEntradaApi.getMessages());
  const [tasks] = useState(bandejaEntradaApi.getTasks());
  const [notifications] = useState(bandejaEntradaApi.getNotifications());

  const tabs = [
    {
      id: 'messages' as const,
      label: 'Mensajes',
      icon: Mail,
      count: messages.filter(m => !m.read).length
    },
    {
      id: 'tasks' as const,
      label: 'Tareas',
      icon: CheckSquare,
      count: tasks.filter(t => !t.completed).length
    },
    {
      id: 'notifications' as const,
      label: 'Notificaciones',
      icon: Bell,
      count: notifications.filter(n => !n.read).length
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessageCenter messages={messages} />;
      case 'tasks':
        return <TasksPanel tasks={tasks} />;
      case 'notifications':
        return <NotificationsPanel notifications={notifications} />;
      default:
        return <MessageCenter messages={messages} />;
    }
  };

  const totalUnread = tabs.reduce((sum, tab) => sum + tab.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <Inbox className="w-10 h-10 text-white" />
                </div>
                {totalUnread > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{totalUnread}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Bandeja de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Entrada</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Centro unificado de <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">comunicaciones</span> y notificaciones
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Activity className="w-4 h-4 text-green-300 animate-pulse" />
              <span className="text-sm font-semibold text-white">En tiempo real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 py-4 px-1 font-semibold text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>

                  {tab.count > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {tab.count}
                    </span>
                  )}

                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeInboxTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BandejaEntradaPage;
