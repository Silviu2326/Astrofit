import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Zap, Settings, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TriggerNodeData {
  label: string;
  description?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

const TriggerNode: React.FC<{ data: TriggerNodeData; selected?: boolean }> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-xl shadow-xl overflow-hidden w-52 ${
        selected ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-blue-500' : ''
      }`}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Status indicator */}
      {data.isActive && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
      )}

      {/* Main content */}
      <div className="relative p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {data.icon || <Zap className="w-5 h-5" />}
            </motion.div>
            <div>
              <div className="font-semibold text-sm leading-tight">{data.label}</div>
              {data.description && (
                <div className="text-xs text-blue-100 opacity-75 mt-1 leading-tight">
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

        {/* Progress indicator */}
        <div className="flex items-center space-x-2 text-xs">
          <CheckCircle className="w-3 h-3 text-green-300" />
          <span className="text-blue-100">Configurado</span>
        </div>
      </div>

      {/* Enhanced handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 !bg-gradient-to-br !from-blue-300 !to-blue-400 !border-2 !border-white shadow-lg hover:scale-125 transition-transform"
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-xl blur-xl -z-10" />
    </motion.div>
  );
};

export default TriggerNode;