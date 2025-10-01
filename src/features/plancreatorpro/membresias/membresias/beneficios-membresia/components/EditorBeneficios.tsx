import React from 'react';

interface EditorBeneficiosProps {
  // Props para el editor, por ejemplo, el nivel de membresía actual
  nivelMembresia: string;
}

const EditorBeneficios: React.FC<EditorBeneficiosProps> = ({ nivelMembresia }) => {
  // Lógica para editar beneficios por nivel de membresía
  // Incluirá campos para añadir/eliminar beneficios, seleccionar plantillas, categorizar, etc.

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-3">Editor de Beneficios para {nivelMembresia}</h2>
      {/* Aquí irán los controles para editar los beneficios */}
      <p>Aquí se gestionarán los beneficios específicos para el nivel de membresía "{nivelMembresia}".</p>
      {/* Ejemplo de un beneficio */}
      <div className="flex items-center justify-between mt-2">
        <span>1 directo semanal</span>
        {/* Aquí se integraría el SwitchBeneficios */}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span>Recetas exclusivas</span>
        {/* Aquí se integraría el SwitchBeneficios */}
      </div>
      {/* Botones para añadir plantillas o nuevos beneficios */}
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Añadir Beneficio</button>
    </div>
  );
};

export default EditorBeneficios;
