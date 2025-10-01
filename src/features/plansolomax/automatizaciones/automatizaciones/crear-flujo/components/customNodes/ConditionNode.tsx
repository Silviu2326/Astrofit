import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitMerge } from 'lucide-react';

const ConditionNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg overflow-hidden w-48">
      <div className="p-3 flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-full">
          <GitMerge className="w-5 h-5" />
        </div>
        <div className="font-semibold text-sm">{data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-purple-300"
      />
      <Handle
        id="true"
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-green-300"
        style={{ left: '75%' }}
      />
      <Handle
        id="false"
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-red-300"
        style={{ left: '25%' }}
      />
    </div>
  );
};

export default ConditionNode;
