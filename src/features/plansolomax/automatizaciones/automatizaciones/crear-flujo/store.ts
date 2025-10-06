import { create } from 'zustand';
import { Node } from 'reactflow';
import { temporal } from 'zundo';

type Store = {
  nodes: Node[];
  selectedNode: Node | null;
  setNodes: (nodes: Node[]) => void;
  setSelectedNode: (node: Node | null) => void;
  updateNodeData: (nodeId: string, data: any) => void;
};

export const useStore = create<Store>()(
  temporal((set) => ({
    nodes: [],
    selectedNode: null,
    setNodes: (nodes) => set({ nodes }),
    setSelectedNode: (node) => set({ selectedNode: node }),
    updateNodeData: (nodeId, data) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
        ),
        selectedNode: state.selectedNode?.id === nodeId ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...data } } : state.selectedNode,
      })),
  }))
);