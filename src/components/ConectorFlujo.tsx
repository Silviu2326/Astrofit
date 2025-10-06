import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  removeElements,
  Connection,
  Edge,
  Elements,
  Node,
  Handle,
} from 'react-flow-renderer';

// --- Define connector types ---
enum ConnectorType {
  Direct = 'direct',
  Conditional = 'conditional',
  Error = 'error',
  Delay = 'delay',
}

// --- Style for each connector type ---
const connectionLineStyle = { stroke: '#fff' };
const edgeStyles = {
  [ConnectorType.Direct]: { stroke: '#5f9ea0', strokeWidth: 2 },
  [ConnectorType.Conditional]: { stroke: '#ff8c00', strokeWidth: 2 },
  [ConnectorType.Error]: { stroke: '#dc143c', strokeWidth: 2 },
  [ConnectorType.Delay]: { stroke: '#9932cc', strokeWidth: 2 },
};

// --- Initial elements ---
const initialElements: Elements = [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Step 2' }, position: { x: 250, y: 100 } },
    { id: '3', type: 'custom', data: { label: 'Custom Node' }, position: { x: 400, y: 200 } },
    { id: '4', type: 'output', data: { label: 'End' }, position: { x: 250, y: 300 } },
    { id: 'e1-2', source: '1', target: '2', label: 'Direct connection', style: edgeStyles.direct },
];

// --- Custom Node with custom handles ---
const CustomNode = ({ data }: { data: any }) => (
  <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
    <div>{data.label}</div>
    <Handle type="source" position="right" id="a" style={{ top: 10, background: '#555' }} />
    <Handle type="source" position="right" id="b" style={{ top: 20, background: '#555' }} />
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};


const ConectorFlujo = () => {
  const [elements, setElements] = useState<Elements>(initialElements);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: Connection | Edge) => {
    const { source, target, sourceHandle, targetHandle } = params;
    let newEdge: Edge = {
        ...params,
        id: `e${source}${sourceHandle}-${target}${targetHandle}`,
        style: edgeStyles.direct, // Default style
        label: 'Connection',
        animated: true,
    };

    // --- Logic to determine connection type ---
    if (sourceHandle === 'a') {
        newEdge = { ...newEdge, style: edgeStyles.conditional, label: 'If/Else' };
    } else if (sourceHandle === 'b') {
        newEdge = { ...newEdge, style: edgeStyles.error, label: 'Error' };
    }
    
    setElements((els) => addEdge(newEdge, els));
  };

  // --- Connection validation ---
  const isValidConnection = (connection: Connection): boolean => {
    if (connection.source === connection.target) return false;
    const sourceNode = elements.find((el) => el.id === connection.source);
    if (sourceNode) {
      const sourceConnections = elements.filter(
        (el) => 'source' in el && el.source === connection.source
      );
      if (sourceConnections.length >= 3) return false;
    }
    return true;
  };

  // --- Edit connection on click ---
  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    const newLabel = prompt('Enter new label:', edge.label as string);
    if (newLabel) {
      setElements((els) =>
        els.map((el) => (el.id === edge.id ? { ...el, label: newLabel } : el))
      );
    }
  };

  // --- Add new node ---
  const addNode = () => {
    const newNode: Node = {
      id: `${elements.length + 1}`,
      type: 'custom',
      data: { label: `Node ${elements.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setElements((els) => [...els, newNode]);
  };


  return (
    <div style={{ height: 800 }}>
      <button onClick={addNode}>Add Custom Node</button>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onEdgeClick={onEdgeClick}
        deleteKeyCode={46} /* delete */
        connectionLineStyle={connectionLineStyle}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ConectorFlujo;