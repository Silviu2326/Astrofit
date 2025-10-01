
import React from 'react';
import { Handle, Position } from 'reactflow';
import { PlayCircle } from 'lucide-react';

const TriggerNode = ({ data }) => {
  return (
    <div className="react-flow__node-trigger">
      <Handle type="source" position={Position.Bottom} />
      <div className="icon">
        <PlayCircle />
      </div>
      <div className="label">{data.label}</div>
    </div>
  );
};

export default TriggerNode;
