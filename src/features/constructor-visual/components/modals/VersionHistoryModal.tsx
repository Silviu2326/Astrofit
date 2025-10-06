import React from 'react';

const VersionHistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Historial de Versiones</h2>
        {/* Aquí irá el contenido del historial de versiones */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VersionHistoryModal;
