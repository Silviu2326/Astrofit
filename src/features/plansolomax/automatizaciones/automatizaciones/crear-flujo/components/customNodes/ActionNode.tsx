import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, MessageSquare, Webhook, Settings, Clock, CheckCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  email: Mail,
  sms: MessageSquare,
  webhook: Webhook,
};

interface ActionNodeData {
  label: string;
  type: 'email' | 'sms' | 'webhook';
  description?: string;
  isExecuting?: boolean;
  isCompleted?: boolean;
  executionTime?: string;
}

const ActionNode: React.FC<{ data: ActionNodeData; selected?: boolean }> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[data.type] || Mail;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-xl shadow-xl overflow-hidden w-52 ${
        selected ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-emerald-500' : ''
      }`}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Status indicators */}
      <div className="absolute top-2 right-2 flex space-x-1">
        {data.isExecuting && (
          <motion.div
            className="w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
        {data.isCompleted && (
          <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg" />
        )}
      </div>

      {/* Main content */}
      <div className="relative p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            <div>
              <div className="font-semibold text-sm leading-tight">{data.label}</div>
              {data.description && (
                <div className="text-xs text-emerald-100 opacity-75 mt-1 leading-tight">
                  {data.description}
                </div>
              )}
            </div>
          </div>

          {/* Settings button on hover */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Settings className="w-3 h-3" />
          </motion.button>
        </div>

        {/* Execution status */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            {data.isExecuting ? (
              <motion.div
                className="flex items-center space-x-1"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Play className="w-3 h-3 text-yellow-300" />
                <span className="text-emerald-100">Ejecutando...</span>
              </motion.div>
            ) : data.isCompleted ? (
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-300" />
                <span className="text-emerald-100">Completado</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-emerald-300" />
                <span className="text-emerald-100">Pendiente</span>
              </div>
            )}
          </div>
          {data.executionTime && (
            <span className="text-emerald-200 opacity-75">{data.executionTime}</span>
          )}
        </div>
      </div>

      {/* Enhanced handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 !bg-gradient-to-br !from-emerald-300 !to-emerald-400 !border-2 !border-white shadow-lg hover:scale-125 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 !bg-gradient-to-br !from-emerald-300 !to-emerald-400 !border-2 !border-white shadow-lg hover:scale-125 transition-transform"
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-xl blur-xl -z-10" />
    </motion.div>
  );
};

export default ActionNode;