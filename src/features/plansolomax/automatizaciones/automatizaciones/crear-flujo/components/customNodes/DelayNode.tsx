import React from 'react';
import { Handle, Position } from 'reactflow';
import { Timer } from 'lucide-react';

const DelayNode: React.FC<{ data: { label: string; delay?: string } }> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg overflow-hidden w-48">
      <div className="p-3 flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Timer className="w-5 h-5" />
        </div>
        <div className="font-semibold text-sm">{data.label}</div>
      </div>
      {data.delay && (
        <div className="px-3 pb-2 text-xs opacity-90">
          {data.delay}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-orange-300"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-orange-300"
      />
    </div>
  );
};

export default DelayNode;