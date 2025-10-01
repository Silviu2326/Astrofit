
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Clock } from 'lucide-react';

const DelayNode = ({ data }) => {
  return (
    <div className="react-flow__node-delay">
      <Handle type="target" position={Position.Top} />
      <div className="icon">
        <Clock />
      </div>
      <div className="label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DelayNode;
