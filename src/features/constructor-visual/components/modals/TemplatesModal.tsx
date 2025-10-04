import React from 'react';

const TemplatesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Plantillas</h2>
        {/* Aquí irá el contenido de las plantillas */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default TemplatesModal;
