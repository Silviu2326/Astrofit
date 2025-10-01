import React from 'react';
import { Download, Upload, Plus, Tags, Send, Trash2 } from 'lucide-react';

interface ClientesActionsProps {
  selectedCount: number;
  onAddCliente: () => void;
  onExport: () => void;
  onImport: () => void;
  onAddTags: () => void;
  onSendForms: () => void;
  onDeleteSelected: () => void;
}

const ClientesActions: React.FC<ClientesActionsProps> = ({
  selectedCount,
  onAddCliente,
  onExport,
  onImport,
  onAddTags,
  onSendForms,
  onDeleteSelected,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all shadow-sm"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          Exportar
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all shadow-sm"
          onClick={onImport}
        >
          <Upload className="w-4 h-4" />
          Importar
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          onClick={onAddCliente}
        >
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100">
          <span className="font-medium">{selectedCount} seleccionados</span>
          <button onClick={onAddTags} className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-100">
            <Tags className="w-4 h-4" /> Añadir etiquetas
          </button>
          <button onClick={onSendForms} className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-100">
            <Send className="w-4 h-4" /> Enviar formularios
          </button>
          <button onClick={onDeleteSelected} className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-100 text-red-600">
            <Trash2 className="w-4 h-4" /> Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientesActions;

