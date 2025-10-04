
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import Sidebar from './ui/Sidebar';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';
import VersionHistoryModal from './modals/VersionHistoryModal';
import TemplatesModal from './modals/TemplatesModal';
import { useAutoSave } from '../../../hooks/useAutoSave';

import './ui/NodosAcciones.css';
import './CrearFlujoPage.css';

const initialNodes = [
  {
    id: '1',
    type: 'trigger',
    data: { label: 'Inicio' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
};

let id = 2;
const getId = () => `${id++}`;

const Header = ({ onOpenVersionHistory, onOpenTemplates, onExport, onImportClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="breadcrumbs">
          <span>Flujos</span> / <span>Flujo de bienvenida</span>
        </div>
        <input type="text" defaultValue="Flujo de bienvenida" className="flow-title-input" />
        <span className="flow-status">Borrador</span>
      </div>
      <div className="header-right">
        <button className="btn-secondary" onClick={onImportClick}>Importar</button>
        <button className="btn-secondary" onClick={onExport}>Exportar</button>
        <button className="btn-secondary" onClick={onOpenTemplates}>Plantillas</button>
        <button className="btn-secondary" onClick={onOpenVersionHistory}>Historial</button>
        <button className="btn-secondary">Configuración</button>
        <button className="btn-secondary">Probar</button>
        <button className="btn-primary">Guardar</button>
        <button className="btn-primary">Publicar</button>
      </div>
    </header>
  );
};

const CrearFlujoPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const importInputRef = React.useRef(null);

  const saveFlow = () => {
    console.log('Flow saved!', { nodes, edges });
  };

  useAutoSave(saveFlow, 10000);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onExport = () => {
    const flow = {
      nodes,
      edges,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flow));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "flow.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const onImport = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const flow = JSON.parse(event.target.result);
      setNodes(flow.nodes);
      setEdges(flow.edges);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const onImportClick = () => {
    importInputRef.current.click();
  };

  return (
    <div className="crear-flujo-page">
      <Header 
        onOpenVersionHistory={() => setIsVersionHistoryOpen(true)} 
        onOpenTemplates={() => setIsTemplatesOpen(true)} 
        onExport={onExport}
        onImportClick={onImportClick}
      />
      <div className="main-content">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} collapsible collapsed={sidebarCollapsed}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <ReactFlowProvider>
              <div className="canvas-container">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  nodeTypes={nodeTypes}
                  fitView
                >
                  <Controls />
                  <MiniMap />
                  <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={20}>
            <div className="properties-panel">
              {/* Aquí irá el panel de propiedades */}
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <VersionHistoryModal isOpen={isVersionHistoryOpen} onClose={() => setIsVersionHistoryOpen(false)} />
      <TemplatesModal isOpen={isTemplatesOpen} onClose={() => setIsTemplatesOpen(false)} />
      <input type="file" ref={importInputRef} style={{ display: 'none' }} onChange={onImport} />
    </div>
  );
};

export default CrearFlujoPage;
