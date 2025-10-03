import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Segment } from '../SegmentosPage';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';
import InputModal from '../../../../../components/ui/input-modal';

interface SegmentoActionsProps {
  segment: Segment;
  onDelete: (segmentId: string) => void;
}

const SegmentoActions: React.FC<SegmentoActionsProps> = ({ segment, onDelete }) => {
  const [showTagModal, setShowTagModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleTag = (tagName: string) => {
    // Simular aplicación de etiqueta
    console.log(`Aplicando etiqueta "${tagName}" a ${segment.memberCount} miembros del segmento "${segment.name}"`);
    toast.success(`✅ Etiqueta "${tagName}" aplicada a ${segment.memberCount} miembros`);
  };

  const handleExport = () => {
    // Simular exportación de datos
    const csvContent = `Nombre,Email,Telefono,Ultima Actividad,Etiquetas\n` +
      `Cliente 1,cliente1@email.com,123456789,2025-01-15,"Premium,Activo"\n` +
      `Cliente 2,cliente2@email.com,987654321,2025-01-14,"Premium,Inactivo"\n` +
      `... (${segment.memberCount} registros totales)`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `segmento_${segment.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`📊 Exportando ${segment.memberCount} miembros a CSV`);
  };

  const handleSendForm = (formTitle: string) => {
    // Simular envío de formulario
    console.log(`Enviando formulario "${formTitle}" a ${segment.memberCount} miembros del segmento "${segment.name}"`);
    toast.success(`📝 Formulario "${formTitle}" enviado a ${segment.memberCount} miembros`);
  };

  const handleDeleteConfirm = () => {
    onDelete(segment.id);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Acciones sobre el Segmento: {segment.name}</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowTagModal(true)}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors text-sm"
        >
          🏷️ Etiquetar Miembros
        </button>
        <button
          onClick={handleExport}
          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors text-sm"
        >
          📊 Exportar Miembros
        </button>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors text-sm"
        >
          📝 Enviar Formulario
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          🗑️ Eliminar Segmento
        </button>
      </div>

      {/* Modales */}
      <InputModal
        isOpen={showTagModal}
        onClose={() => setShowTagModal(false)}
        onSubmit={handleTag}
        title="Etiquetar Miembros"
        label="Nombre de la etiqueta"
        placeholder="Ej: Clientes Premium, Interesados, etc."
        submitText="Aplicar Etiqueta"
        maxLength={50}
      />

      <InputModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSendForm}
        title="Enviar Formulario"
        label="Título del formulario"
        placeholder="Ej: Encuesta de satisfacción, Evaluación de servicios, etc."
        submitText="Enviar Formulario"
        maxLength={100}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Segmento"
        message={`¿Estás seguro de que quieres eliminar el segmento "${segment.name}"?\n\nEsta acción no se puede deshacer y afectará a ${segment.memberCount} miembros.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default SegmentoActions;