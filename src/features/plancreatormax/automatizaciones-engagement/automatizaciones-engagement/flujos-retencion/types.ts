export type NodeType = 'trigger' | 'email' | 'sms' | 'push' | 'tag' | 'plan' | 'webhook' | 'conditional' | 'delay' | 'split';

export type FlowStatus = 'active' | 'paused' | 'draft';

export interface FlowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    config?: any;
  };
  connections?: string[]; // IDs of connected nodes
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'yes' | 'no' | 'default';
}

export interface Flow {
  id: string;
  name: string;
  trigger: string;
  steps: number;
  activeClients: number;
  conversionRate: number;
  status: FlowStatus;
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdAt: string;
  updatedAt: string;
  revenue?: number;
}

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'reactivation' | 'upsell' | 'renewal' | 'recovery';
  icon: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowStats {
  activeFlows: number;
  clientsInFlows: number;
  retentionRate: number;
  conversionsGenerated: number;
}

export interface FlowExecution {
  id: string;
  flowId: string;
  clientId: string;
  clientName: string;
  entryDate: string;
  currentStep: string;
  nextAction: string;
  status: 'in_progress' | 'completed' | 'exited';
  completionRate: number;
}

export interface FlowAnalytics {
  flowId: string;
  totalEntries: number;
  completions: number;
  conversionRate: number;
  averageTime: string;
  revenue: number;
  nodeMetrics: {
    nodeId: string;
    reached: number;
    converted: number;
    dropOffRate: number;
  }[];
  emailMetrics: {
    nodeId: string;
    sent: number;
    opened: number;
    clicked: number;
    openRate: number;
    clickRate: number;
  }[];
}

export interface Segment {
  id: string;
  name: string;
  type: 'plan' | 'location' | 'behavior' | 'tag';
  value: string;
  audienceSize: number;
}

export interface AIOptimization {
  suggestion: string;
  impact: string;
  confidence: number;
  type: 'delay' | 'subject' | 'content' | 'path';
  nodeId?: string;
}
