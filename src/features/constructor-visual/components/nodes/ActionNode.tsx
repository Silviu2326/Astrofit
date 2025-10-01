
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, MessageSquare, Webhook } from 'lucide-react';

const icons = {
  email: <Mail />,
  sms: <MessageSquare />,
  webhook: <Webhook />,
};

const ActionNode = ({ data }) => {
  return (
    <div className="react-flow__node-action">
      <Handle type="target" position={Position.Top} />
      <div className="icon">{icons[data.type] || <Mail />}</div>
      <div className="label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ActionNode;
