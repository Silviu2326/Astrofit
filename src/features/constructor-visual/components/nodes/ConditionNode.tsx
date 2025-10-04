
import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';

const ConditionNode = ({ data }) => {
  return (
    <div className="react-flow__node-condition">
      <Handle type="target" position={Position.Top} />
      <div className="icon">
        <GitBranch />
      </div>
      <div className="label">{data.label}</div>
      <Handle id="true" type="source" position={Position.Bottom} style={{ left: '25%' }} />
      <Handle id="false" type="source" position={Position.Bottom} style={{ left: '75%' }} />
    </div>
  );
};

export default ConditionNode;
