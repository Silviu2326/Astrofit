import React, { useState } from 'react';
import {
  Type,
  Image as ImageIcon,
  Divide,
  Layout,
  Square,
  AlignLeft,
  Code,
  Save,
  Eye,
  Trash2,
  MoveUp,
  MoveDown,
  GripVertical,
  Palette,
  Link as LinkIcon,
} from 'lucide-react';

interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'columns' | 'html';
  content: any;
  style: any;
}

interface EditorEmailDragDropProps {
  initialTemplate?: any;
  onSave: (template: any) => void;
}

export default function EditorEmailDragDrop({
  initialTemplate,
  onSave,
}: EditorEmailDragDropProps) {
  const [blocks, setBlocks] = useState<EmailBlock[]>(
    initialTemplate?.blocks || []
  );
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [templateName, setTemplateName] = useState(
    initialTemplate?.name || 'Nueva Plantilla'
  );
  const [globalSettings, setGlobalSettings] = useState({
    backgroundColor: '#f3f4f6',
    containerWidth: '600px',
    fontFamily: 'Arial, sans-serif',
  });

  const blockTypes = [
    { type: 'text', icon: Type, label: 'Texto' },
    { type: 'image', icon: ImageIcon, label: 'Imagen' },
    { type: 'button', icon: Square, label: 'Botón' },
    { type: 'divider', icon: Divide, label: 'Divisor' },
    { type: 'spacer', icon: AlignLeft, label: 'Espaciador' },
    { type: 'columns', icon: Layout, label: 'Columnas' },
    { type: 'html', icon: Code, label: 'HTML' },
  ];

  const addBlock = (type: EmailBlock['type']) => {
    const defaultContent = {
      text: { html: '<p>Escribe tu texto aquí...</p>' },
      image: { src: 'https://via.placeholder.com/600x200', alt: 'Imagen' },
      button: { text: 'Haz clic aquí', url: '#' },
      divider: { style: 'solid', color: '#e5e7eb' },
      spacer: { height: '20px' },
      columns: { columns: [{ html: 'Columna 1' }, { html: 'Columna 2' }] },
      html: { code: '<div>Tu HTML personalizado</div>' },
    };

    const defaultStyle = {
      text: { padding: '10px', fontSize: '16px', color: '#374151' },
      image: { padding: '0px' },
      button: {
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: '6px',
        textAlign: 'center',
      },
      divider: { margin: '20px 0' },
      spacer: {},
      columns: { gap: '20px' },
      html: { padding: '10px' },
    };

    const newBlock: EmailBlock = {
      id: `block-${Date.now()}`,
      type,
      content: defaultContent[type],
      style: defaultStyle[type],
    };

    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<EmailBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(null);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    )
      return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    onSave({
      name: templateName,
      blocks,
      globalSettings,
      createdAt: new Date().toISOString(),
    });
  };

  const renderBlockPreview = (block: EmailBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div
            style={block.style}
            dangerouslySetInnerHTML={{ __html: block.content.html }}
          />
        );
      case 'image':
        return (
          <img
            src={block.content.src}
            alt={block.content.alt}
            style={{ width: '100%', ...block.style }}
          />
        );
      case 'button':
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <a
              href={block.content.url}
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                ...block.style,
              }}
            >
              {block.content.text}
            </a>
          </div>
        );
      case 'divider':
        return (
          <hr
            style={{
              border: 'none',
              borderTop: `1px ${block.content.style} ${block.content.color}`,
              ...block.style,
            }}
          />
        );
      case 'spacer':
        return <div style={{ height: block.content.height }} />;
      case 'columns':
        return (
          <div style={{ display: 'flex', gap: block.style.gap }}>
            {block.content.columns.map((col: any, i: number) => (
              <div key={i} style={{ flex: 1 }}>
                <div dangerouslySetInnerHTML={{ __html: col.html }} />
              </div>
            ))}
          </div>
        );
      case 'html':
        return (
          <div
            style={block.style}
            dangerouslySetInnerHTML={{ __html: block.content.code }}
          />
        );
      default:
        return null;
    }
  };

  const renderBlockEditor = (block: EmailBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <textarea
              value={block.content.html}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, html: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-lg resize-none"
              rows={4}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Tamaño fuente"
                value={block.style.fontSize}
                onChange={(e) =>
                  updateBlock(block.id, {
                    style: { ...block.style, fontSize: e.target.value },
                  })
                }
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="color"
                value={block.style.color}
                onChange={(e) =>
                  updateBlock(block.id, {
                    style: { ...block.style, color: e.target.value },
                  })
                }
                className="px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="URL de la imagen"
              value={block.content.src}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, src: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Texto alternativo"
              value={block.content.alt}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, alt: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        );
      case 'button':
        return (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Texto del botón"
              value={block.content.text}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="URL"
              value={block.content.url}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, url: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="color"
                value={block.style.backgroundColor}
                onChange={(e) =>
                  updateBlock(block.id, {
                    style: { ...block.style, backgroundColor: e.target.value },
                  })
                }
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="color"
                value={block.style.color}
                onChange={(e) =>
                  updateBlock(block.id, {
                    style: { ...block.style, color: e.target.value },
                  })
                }
                className="px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        );
      case 'spacer':
        return (
          <input
            type="text"
            placeholder="Altura (ej: 20px)"
            value={block.content.height}
            onChange={(e) =>
              updateBlock(block.id, {
                content: { ...block.content, height: e.target.value },
              })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Vista Previa - {templateName}
          </h2>
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Volver al Editor
          </button>
        </div>

        <div
          className="mx-auto border shadow-lg"
          style={{
            width: globalSettings.containerWidth,
            backgroundColor: globalSettings.backgroundColor,
            fontFamily: globalSettings.fontFamily,
          }}
        >
          {blocks.map((block) => (
            <div key={block.id}>{renderBlockPreview(block)}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-300px)] flex">
      {/* Sidebar - Bloques */}
      <div className="w-64 border-r bg-gray-50 p-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Añadir Bloques</h3>
        <div className="space-y-2">
          {blockTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <button
                key={blockType.type}
                onClick={() => addBlock(blockType.type as EmailBlock['type'])}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {blockType.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-4">
            Configuración Global
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ancho contenedor
              </label>
              <input
                type="text"
                value={globalSettings.containerWidth}
                onChange={(e) =>
                  setGlobalSettings({
                    ...globalSettings,
                    containerWidth: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Color fondo
              </label>
              <input
                type="color"
                value={globalSettings.backgroundColor}
                onChange={(e) =>
                  setGlobalSettings({
                    ...globalSettings,
                    backgroundColor: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="text-xl font-bold border-b-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none px-2 py-1"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Vista Previa
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar Template
            </button>
          </div>
        </div>

        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            width: globalSettings.containerWidth,
            backgroundColor: globalSettings.backgroundColor,
          }}
        >
          {blocks.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Arrastra bloques aquí para comenzar</p>
            </div>
          ) : (
            blocks.map((block, index) => (
              <div
                key={block.id}
                className={`group relative border-2 transition-all ${
                  selectedBlock === block.id
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-transparent hover:border-blue-300'
                }`}
                onClick={() => setSelectedBlock(block.id)}
              >
                {/* Controles */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'up');
                    }}
                    className="p-1 bg-white border rounded shadow-sm hover:bg-gray-50"
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button className="p-1 bg-white border rounded shadow-sm cursor-move">
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'down');
                    }}
                    className="p-1 bg-white border rounded shadow-sm hover:bg-gray-50"
                    disabled={index === blocks.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  className="absolute -right-10 top-4 p-2 bg-red-500 text-white rounded shadow-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {renderBlockPreview(block)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar derecho - Propiedades */}
      {selectedBlock && (
        <div className="w-80 border-l bg-gray-50 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">
            Propiedades del Bloque
          </h3>
          {renderBlockEditor(blocks.find((b) => b.id === selectedBlock)!)}
        </div>
      )}
    </div>
  );
}
